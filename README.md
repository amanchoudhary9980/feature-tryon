# AR Earring Try-On

A browser prototype that puts earrings on you through your webcam. MediaPipe Face Mesh tracks 468 face landmarks every frame; the earring images are anchored to the ear landmarks and move with your head. A button cycles through designs.

## Stack

Vanilla JavaScript, HTML canvas, MediaPipe Face Mesh (loaded from a CDN)

## Run it

Camera access needs a secure origin, so serve the folder locally:

```bash
npx serve .
```

Then open the printed localhost URL and allow camera access.
