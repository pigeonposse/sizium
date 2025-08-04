import { joinPath } from './sys'

console.log( await joinPath( '/absolute', '/subfolder/', 'file.txt' ) )
console.log( await joinPath( 'relative', 'subfolder/' ) )
