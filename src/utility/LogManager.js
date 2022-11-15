export class LogManager {
  static DISPLAY_LOG = process.env.NODE_ENV === 'development'

  constructor() {
  }

  static SetDisplay( DisplayLog ) {
    this.DISPLAY_LOG = DisplayLog
  }

  static w( Type, Content1, Content2, Content3 ) {
    const PageName = (typeof Type === "undefined") ? "" : "[" + Type + "] "
    if( this.DISPLAY_LOG ) {
      switch( arguments.length ) {
        case 1:
          console.log( "%s", PageName )
          break;
        case 2:
          console.log( "%s%s", PageName, Content1 )
          break;
        case 3:
          console.log( "%s%s - %s", PageName, Content1, Content2 )
          break;
        case 4:
          console.log( "%s%s - %s : %s", PageName, Content1, Content2, Content3 )
          break;
      }
    }
  }
}
export default LogManager
