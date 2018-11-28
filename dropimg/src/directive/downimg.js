import 'whatwg-fetch';

export default function(el, binding) {
    el.onclick = function () {
        fetch(binding.value).then((response) => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('download error!');
        }).then((blob) => {
            const href = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', href);
            a.setAttribute('download', binding.value);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
}
