Build video example:
https://www.youtube.com/watch?v=Y9lL2vC9YDw

Build steps:
1. ydr -> odr (Open IV)
2. dds -> png |cd convert-dds-to-png| |node app|
3. odr -> obj |cd converter-odr-to-obj| |run.cmd|
4. obj -> glb |cd convert-obj-to-glb| |node convert|


Credits: 
https://github.com/ImageMagick/ImageMagick
https://github.com/CesiumGS/obj2gltf
https://github.com/hedgehog90/openformat-to-obj