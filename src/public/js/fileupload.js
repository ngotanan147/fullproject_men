const inputElement = document.querySelector('.form-create input[name=image]');
// Create a FilePond instance
const pond = FilePond.create(inputElement)

FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginImageTransform,
    FilePondPluginImageResize

);
FilePond.parse(document.body)