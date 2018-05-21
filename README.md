# Hyper Random Image

Change background-image on every activation of Hyper.js

## How to Use

```bash
$ mkdir ~/.hyper_images
$ hyper i hyper-random-image
```
Next, you put images (.jpg, .png, .gif) into this directory,
then terminal chooses background-image from them randomly.
Try ⇧⌘R (Super-Reload)!

This plugin uses `decorateConfig` Event on Hyper.js, so it changes background-image randomly when `decorateConfig` Event Triggered (on Super-Reloaded, or on save `~/.hyper.js` etc.).
