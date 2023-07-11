
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
    import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut
    } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
    import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCSUQoYmYbmbkKoIbDQcQhOxnada13rBWY",
        authDomain: "memory-c1192.firebaseapp.com",
        projectId: "memory-c1192",
        storageBucket: "memory-c1192.appspot.com",
        messagingSenderId: "320978503728",
        appId: "1:320978503728:web:49c1ef1f72cd9a595745f5",
        measurementId: "G-QP4M89SW8F",
        databaseURL: "https://memory-c1192-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const database = getDatabase(app);

    submitData.addEventListener('click', (e) => {

        var email = document.getElementById('email').value;
        var password = document.getElementById('psw').value;

        //sign up user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ... user.uid
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    password: password
                })
                    .then(() => {
                        // Data saved successfully!
                        alert('user created successfully');

                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage);
            });

        // log in user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...

                // save log in details into real time database
                var lgDate = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: lgDate,
                })
                    .then(() => {
                        // Data saved successfully!
                        alert('user logged in successfully');

                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });

        //sign out user
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    });

