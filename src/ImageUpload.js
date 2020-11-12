import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage, db } from "./Firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // this is where the progress is
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                // completes the function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        // post the image in the database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div className="imageupload">
            {/* Here we're going to have: */}
            {/* The progress bar */}
            <progress className="imageupload__progress" value={progress} max="100" />
            {/* The caption input */}
            <input
                type="text"
                placeholder="Enter a caption"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
            />
            {/* A file picker */}
            <input type="file" onChange={handleChange} />
            {/* And a post button */}
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    );
}

export default ImageUpload;