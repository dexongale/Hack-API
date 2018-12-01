function transform(public_url, options, CLOUDINARY) {
    if (options.command == "THUMBNAIL") {
        return CLOUDINARY.url(public_url, {
            width: 20,
            height: 20,
            crop: "fill"
        });
    } else if (options.command == "GRAYSCALE") {
        return CLOUDINARY.url(public_url, { effect: "grayscale" });
    } else if (options.command == "BLUR") {
        return CLOUDINARY.url(public_url, { effect: "blur" });
    } else if (options.command == "CONVERT") {
        let targetExtension = "jpg";
        return CLOUDINARY.url(public_url, { fetch_format: targetExtension });
    } else if (options.command == "MEMIFY") {
        return CLOUDINARY.url(public_url, {
            overlay: `text:dark_name:${options.text.replace(" ", "+")}`,
            gravity: "south_east",
            x: 8,
            y: 8
        });
    }
}

module.exports = transform;
