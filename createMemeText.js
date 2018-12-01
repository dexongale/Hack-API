const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "dzifa",
    api_key: "786312297153152",
    api_secret: "1q-gLjj72BTH9MHz-lkcWXqa74s"
});

// cloudinary.v2.uploader.text(
//     "Meme Name",
//     {
//         public_id: "meme",
//         font_family: "Arial",
//         font_size: 12,
//         font_color: "black",
//         opacity: 90
//     },
//     function(error, result) {
//         console.log(result, error);
//     }
// );

cloudinary.v2.uploader.text(
    "Sample Name",
    {
        public_id: "dark_name",
        font_family: "Arial",
        font_size: 12,
        font_color: "black",
        opacity: 90
    },
    function(error, result) {
        console.log(result, error);
    }
);
