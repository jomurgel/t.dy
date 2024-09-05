export enum Status {
    INCOMPLETE = 'incomplete',
    PARTIAL = 'partially-complete',
    COMPLETE = 'complete'
}

/**
 * Determines the flow of a todo based on the previous status.
 */
const getNextStatus = ( currentStatus: Status ) => {
  switch ( currentStatus ) {
    case Status.INCOMPLETE:
      return Status.PARTIAL
    case Status.PARTIAL:
      return Status.COMPLETE
    case Status.COMPLETE:
      return Status.INCOMPLETE
    default:
      return Status.INCOMPLETE
  }
}

export default getNextStatus
