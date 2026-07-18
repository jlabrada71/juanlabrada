
export default class FilenameUtils {
  static removeExtension(filename) {
    return filename.indexOf('.') < 1 ? filename : filename.substring(0, filename.lastIndexOf('.'));
  }
}
