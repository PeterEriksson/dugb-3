const functions = require("firebase-functions");
/* import * as functions from "firebase-functions"; */
const admin = require("firebase-admin");
/* const { user } = require("firebase-functions/v1/auth"); */
admin.initializeApp();
const db = admin.firestore();

/* firebase deploy --only functions */

/* TEST (DON'T use -> user ex further down instead) fcn to get started */
/* exports.createUserDocument = functions.auth.user().onCreate((user) => {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    fullName: "Nurrminhoo",
  });
}); */
/* email and fullName ok */
/* displayName: null, photoURL:null */
/* -> user document is created after auth
      .createUserWithEmailAndPassword(email, password)  */
/* ok. */

/* test it out. OK and pushed. */
exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = db.collection("users").doc(user.uid);
  return doc.delete();
});

/* https://firebase.google.com/docs/functions/firestore-events#wildcards-parameters */
/* ok. removed. replace with fcn further down  */
/* exports.createNotificationTest = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const postText = newValue.text;
    const postAuthor = newValue.displayName;
    const _context = context.params.postId;

    return db.collection("notifications").add({
      text: postText,
      hasSeen: [],
      postAuthor: postAuthor,
      context: _context,
    });
  }); */

/* need emulator to speed up testing. ok. */
//https://www.youtube.com/watch?v=gA6WGYQWrKc

/* TEMP UTILITY FOR TESTING IN EMULATOR(DO NOT push to firebase cloud functions) OK. Utility fcn to have to go with notifc fcn testing */
/* exports.userAdded = functions.auth.user().onCreate((user) => {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
  });
}); */

/* Firebase Cloud Function. Create documents in sub-collection of specific collections */
/* https://stackoverflow.com/questions/70341285/firebase-cloud-function-create-documents-in-sub-collection-of-specific-collecti */
/* testing checks out. */
exports.createNotificationOnPost = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const usersData = await db.collection("users").get();
    const userUids = usersData.docs.map((doc) => doc.id);

    //console.log(userUids); //ok, we get the uids

    /* const newValue = snap.data(); */
    const postText = snap.data().postText;
    const postAuthor = snap.data().userName;
    const postAuthorAvatar = snap.data().avatar;
    const postTimestamp = snap.data().timestamp;
    const postId = context.params.postId;

    const postIsRewardPost = snap.data().isRewardPost;

    /* get hold of postAuthors uid. ok....but --> */
    /* const postAuthorUid = usersData.docs.find(
      (doc) => doc.data().displayName === postAuthor
    ).id; */
    /* --> if random user for example Rickard posts we recieve error: "cannot read property "id" of undefined */
    /* rewrite -> seems to work. */
    const postAuthorUid = usersData.docs.some(
      (doc) => doc.data().displayName === postAuthor
    )
      ? usersData.docs.find((doc) => doc.data().displayName === postAuthor).id
      : null;

    const notificationContent = {
      message: `${
        postIsRewardPost
          ? postAuthor + " has new stats!"
          : postAuthor + " has posted"
      }   `,
      text: postText,
      avatar: postAuthorAvatar, //delete for emu-testing
      timestamp: postTimestamp, //delete for emu-testing
      /* New. add 👇, for the user to be able to nav to that location */
      typeLocation: "/",
      hasSeen: false,
      idToScrollTo: postId,
    };

    // WARNING: Limited to 500 writes at once. - not a problem for now lol.
    // If handling more than 500 entries, split into groups.
    const batch = db.batch();
    userUids.forEach((uid) => {
      /* get hold of the postAuthors uid */
      /* only notify other users */
      if (postAuthorUid !== uid) {
        /* const notifyDocRef = db.collection(`users/${uid}/notifications`).doc(); */
        const notifyDocRef = db.doc(`users/${uid}/notifications/${postId}`);

        batch.set(notifyDocRef, notificationContent);
      } else return null;
    });
    await batch.commit();
  });

exports.createNotificationOnList = functions.firestore
  .document("lists/{listId}")
  .onCreate(async (snap, context) => {
    const usersData = await db.collection("users").get();
    const userUids = usersData.docs.map((doc) => doc.id);

    const listHeader = snap.data().header;
    const listAuthor = snap.data().createdBy;
    const listAuthorAvatar = snap.data().avatar;
    const listTimestamp = snap.data().timestamp;

    const listId = context.params.listId;

    /* extra safety(like above in createNotificationOnPost): ...necessary? */
    const listAuthorUid = usersData.docs.some(
      (doc) => doc.data().displayName === listAuthor
    )
      ? usersData.docs.find((doc) => doc.data().displayName === listAuthor).id
      : null;

    const notificationContent = {
      message: `${listAuthor} created a list`,
      text: listHeader,
      avatar: listAuthorAvatar,
      timestamp: listTimestamp,
      typeLocation: "/lists",
      hasSeen: false,
      idToScrollTo: listId,
    };

    // WARNING: Limited to 500 writes at once. - not a problem for now lol.
    // If handling more than 500 entries, split into groups.
    const batch = db.batch();
    userUids.forEach((uid) => {
      /* get hold of the postAuthors uid */
      /* only notify other users */
      if (listAuthorUid !== uid) {
        const notifyDocRef = db.doc(`users/${uid}/notifications/${listId}`);

        batch.set(notifyDocRef, notificationContent);
      } else return null;
    });
    await batch.commit();
  });

exports.deleteNotificationOnListDelete = functions.firestore
  .document("lists/{listId}")
  .onDelete(async (snap, context) => {
    //get hold of the user's uid ->
    //-> the rest of the uids we map thorugh and delete the
    //notification, if it exists (check)
    const listAuthor = snap.data().createdBy;

    //we have the listauthor -> get hold of user doc, then from there -> uid
    const userDoc = await db
      .collection("users")
      .where("displayName", "==", listAuthor)
      .get();
    //get the uid from userDoc. This uid we do NOT want to include in loop. Note this is an array so do [0] later
    const listAuthorUid = userDoc.docs.map((item) => item.id);

    //get hold of all users, so we can begin loop.
    const users = await db
      .collection("users")
      .where("displayName", "!=", listAuthor)
      .get();
    //get the uids
    const userUids = users.docs.map((item) => item.id);

    //listId same as notificationId👇
    const notificationId = context.params.listId;

    userUids.forEach(async (uid) => {
      const userNotifications = await db
        .collection("users")
        .doc(uid)
        .collection("notifications")
        .get();
      const userHasAlreadyDeletedNotification = userNotifications.docs.every(
        (item) => item.id !== notificationId
      );
      if (userHasAlreadyDeletedNotification) {
        return null;
      } else {
        return db
          .collection("users")
          .doc(uid)
          .collection("notifications")
          .doc(notificationId)
          .delete();
      }
    });
  });

exports.createNotificationOnPostLike = functions.firestore
  .document("posts/{postId}/postLikes/{postLikeId}")
  .onCreate(async (snap, context) => {
    //What notification will look like:
    //header:nurrminator liked your post
    //subheader: norman vad gör du?
    //->so we want to get hold of the text of postId
    const allPosts = await db.collection("posts").get();
    const postId = context.params.postId;
    const post = allPosts.docs.find((doc) => doc.id === postId).data();
    const postAuthor = post.userName;

    const postText = post.postText;

    const postLikeId = context.params.postLikeId;

    //ok, we access the parent post.
    //return console.log(post);

    const timestamp = snap.data().timestamp;
    const photoURL = snap.data().photoURL;
    const postLikedBy = snap.data().userName;
    const message = `${postLikedBy} liked your post`;
    const postLikedByphotoURL = snap.data().photoURL;

    /* summary of the content  */
    const notificationContent = {
      message: message,
      text: postText,
      typeLocation: "/",
      timestamp: timestamp,
      avatar: photoURL,
      hasSeen: false,
      idToScrollTo: postId,
    };

    const userToNotify = await db
      .collection("users")
      .where("displayName", "==", postAuthor)
      .get();

    //We need the uid
    const uidToNotify = userToNotify.docs.map((item) => item.id);

    //don't notify if user likes his own post
    if (postAuthor === postLikedBy) return;

    db.collection("users")
      .doc(uidToNotify[0])
      .collection("notifications")
      .doc(postLikeId)
      .set({
        message: notificationContent.message,
        text: notificationContent.text,
        typeLocation: notificationContent.typeLocation,
        timestamp: notificationContent.timestamp,
        hasSeen: notificationContent.hasSeen,
        avatar: notificationContent.avatar,
        idToScrollTo: postId,
      });
  });

exports.deleteNotificationOnPostUnLike = functions.firestore
  .document("posts/{postId}/postLikes/{postLikeId}")
  .onDelete(async (snap, context) => {
    const postId = context.params.postId;
    const postLikeId = context.params.postLikeId;
    //get hold of the original post
    const docRef = db.collection("posts").doc(postId);
    const originalPostAuhtor = (await docRef.get()).data().userName;
    //console.log(originalPostAuhtor); ok.

    //check if the document is in notifications

    //we have the postauthor -> get hold of postAuthor uid
    const postAuthorDoc = await db
      .collection("users")
      .where("displayName", "==", originalPostAuhtor)
      .get();
    const idOfPostAuthorDoc = postAuthorDoc.docs.map((item) => item.id);
    //console.log(idOfPostAuthorDoc[0]); ok.

    //FIRST we need to check if it exists (notification may already have been deleted by user)
    const allNotifications = await db
      .collection("users")
      .doc(idOfPostAuthorDoc[0])
      .collection("notifications")
      .get();
    const notificationHasAlreadyBeenDeleted = allNotifications.docs.every(
      (item) => item.id !== postLikeId
    );

    if (notificationHasAlreadyBeenDeleted) return null;
    //go in to the postAuthors notifications and delete the right document (postLikeId)
    return db
      .collection("users")
      .doc(idOfPostAuthorDoc[0])
      .collection("notifications")
      .doc(postLikeId)
      .delete();

    //tested and seems to work fine.
  });

exports.deleteNotificationOnPostDelete = functions.firestore
  .document("posts/{postId}")
  .onDelete(async (snap, context) => {
    //get hold of the user's uid ->
    //-> the rest of the uids we map thorugh and delete the
    //notification, if it exists (check)
    const postAuthor = snap.data().userName;

    //we have the postauthor -> get hold of user doc, then from there -> uid
    const userDoc = await db
      .collection("users")
      .where("displayName", "==", postAuthor)
      .get();
    //get the uid from userDoc. This uid we do NOT want to include in loop. Note this is an array so do [0] later
    const postAuthorUid = userDoc.docs.map((item) => item.id);

    //get hold of allUsers,postAuthor , so we can begin loop.
    const users = await db
      .collection("users")
      .where("displayName", "!=", postAuthor)
      .get();
    //get the uids
    const userUids = users.docs.map((item) => item.id);

    //postId same as notificationId👇
    const notificationId = context.params.postId;

    userUids.forEach(async (uid) => {
      const userNotifications = await db
        .collection("users")
        .doc(uid)
        .collection("notifications")
        .get();
      const userHasAlreadyDeletedNotification = userNotifications.docs.every(
        (item) => item.id !== notificationId
      );
      if (userHasAlreadyDeletedNotification) {
        return null;
      } else {
        return db
          .collection("users")
          .doc(uid)
          .collection("notifications")
          .doc(notificationId)
          .delete();
      }
    });
  });
