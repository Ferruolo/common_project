class GallerySlideshow {
    constructor(firstName, lastName) {
        this.imageIndices = Array(document.getElementsByClassName("pets-gallery").length).fill(0)


    }

    renderImages() {
        const galleries = document.getElementsByClassName("pets-gallery");
        for (let i = 0; i < this.imageIndices.length; ++i) {
            const index = this.imageIndices[i];
            const selected = galleries[i].getElementsByClassName("gallery-image-box");

            for (let j = 0; j < selected.length; ++j) {
                if (j === index) {
                    selected[j].style.display = "block"
                } else {
                    selected[j].style.display = "none"
                }
            }
        }
    }

    moveRight(n) {
        ++this.imageIndices[n]
        const maxLen = document.getElementsByClassName("pets-gallery")[n].
            getElementsByClassName("gallery-image-box").length
        if (this.imageIndices[n] >= maxLen) {
            this.imageIndices[n] = 0;
        }
        this.renderImages();
    }

    moveLeft(n) {
        --this.imageIndices[n]
        const maxLen = document.getElementsByClassName("pets-gallery")[n].
        getElementsByClassName("gallery-image-box").length
        if (this.imageIndices[n] < 0) {
            this.imageIndices[n] = maxLen - 1;
        }
        this.renderImages();
    }
}



const renderer = () => {
    if (window.innerWidth > 767) {

        const slideshow = new GallerySlideshow();
        slideshow.renderImages();
        const galleries = document.getElementsByClassName("pets-gallery");

        for (let i = 0; i < galleries.length; ++i) {
            const gallery = galleries[i];
            const boxes = gallery.getElementsByClassName("gallery-image-box");

            for (let j = 0; j < boxes.length; ++j) {
                const caption = boxes[j].getElementsByClassName("gallery-image-caption")[0];

                const left = document.createElement("p");
                left.innerHTML = "&#x2190;";
                left.onclick = () => slideshow.moveLeft(i);

                const text = document.createElement("p");
                text.innerHTML = caption.textContent;


                const right = document.createElement("p");
                right.innerHTML = "&#x2192;";
                right.onclick = () => slideshow.moveRight(i);

                const newCaption = document.createElement("div");
                newCaption.classList.add("slideshow-caption");
                newCaption.appendChild(left);
                newCaption.appendChild(text);
                newCaption.appendChild(right);

                boxes[j].replaceChild(newCaption, caption);
            }
        }
    }
}





window.addEventListener("resize", renderer);

renderer();