-----Bitmap Transformer-----

Overview: Bitmap transformer reads a bitmap file and applies one of ten transformations to the file. The modified file is saved as a separate entity.
The project is separated into two major components and a test. Additionally, there is a directory of assets which contains the original bitmap image as well as the modified duplicates.

 The directory branch is as follows:

 bitmapper_ram-rod
 |
 |--assets
 |
 |--lib
 |
 |--model
 |
 |--node_modules
 |
 |--test

 -----Directory Overview-----

---assets---

*Houses all bitmap originals and modified duplicates*

---model---

bitmap.js module: Exports the bitmapper object which models bitmaps as javaScript objects. The bitmapper objects properties are described below:

Bitmap : serves as an object constructor. All of bitmaps properties correspond to meta data that is interpreted from the bitmap image as buffer housing hexi-decimal values using node's native fs module. properties also hold information that indicates the start and end points of various sections of the file. The original buffer is stored as a property of the instantiated object.

Bitmap.newFile : method of the Bitmap constructor that takes a string as a parameter. The string will serve as the file name for a new image. The stored buffer in the object will be used to write the new file.

renderImage : Wrapper for node's native fs module. Takes a path, a callback and a file name as parameters. The path will be used with fs.readFile to retrieve a buffer from a bitmap file. The buffer will be instantiated as a new Bitmap object The callback will come from the transformer.js module. This dictates what type of transformation to apply to the buffer. Finally, the name will be passed to the instantiated Bitmap's newFile method.
