type Message = { pollOptionId: string,votes:number}
type Subscriber = (message: Message) => void

class VotingPubSub{
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollid: string,Subscriber: Subscriber ) {
    if (this.channels[pollid]){
      this.channels[pollid] = []
    }   

    this.channels[pollid].push(Subscriber)
  }
  publish(pollid: string, message: Message){
    if (! this.channels[pollid]){
      return;
    }
    for(const subscriber of this.channels[pollid]){
      subscriber(message)
    }
  }
}

export const voting = new VotingPubSub()