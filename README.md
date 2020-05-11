# project-audio-player

This is a simple project where you can..
- "encrypt" the audio file and download the encrypted file (The encryption uses AES algorith)
- "decrypt" the said audio file and let you play on the browser

We have deployed this on *Heroku* and you can try using it [here](https://audio-player-gr6.herokuapp.com/)!

### On decryption
In order to decrypt the encrypted file, a password is needed. However, for security reason, we have encrypted `password.json` file before pushing onto this repository. Thus, if you wish to implement this simple website, you can create your own `password.json` or change the password in the `script.js`.

### Node modules used
The main module that is used to encrypt the file is `crypto-js`. It is JavaScript implementations of standard and secure cryptographic algorithms For more information on `crypto-js`, you can click [here](https://www.npmjs.com/package/crypto-js).

Other modules used include.. 
- [express](https://www.npmjs.com/package/express)
- [fs](https://www.npmjs.com/package/fs)
- [formidable](https://www.npmjs.com/package/formidable)
- [path](https://www.npmjs.com/package/path)
- [serve-favicon](https://www.npmjs.com/package/serve-favicon)

---

**Special thanks to...**   

  [TutorialZine](https://tutorialzine.com/2013/11/javascript-file-encrypter) article for giving a rough idea and initial UI to this project  
  
  This [stackoverflow post](https://stackoverflow.com/questions/21847182/decipher-an-aes-enciphered-binary-file-with-crypto-js) for helping (a lot) with decrypting encrypted audio file.  
  
  [My friend](https://github.com/VectorXz/secure-player) who did the same project.  
  
  I have to confess. This is my first `node` project, so [this site](https://codeforgeek.com/express-nodejs-tutorial/) helped A LOT to get started.   
  
  Lastly, this [flaviocopes post](https://flaviocopes.com/file-upload-using-ajax/) helped with file uploading. His other posts are very helpful as well, so it won't hurt to check it out, right? :D  
