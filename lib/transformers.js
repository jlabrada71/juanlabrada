export default function curatedName (name) {
  return name.split(' ').join('-').split('?').join('-').toLowerCase()
}
