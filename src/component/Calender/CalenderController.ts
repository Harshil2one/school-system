import { getJson } from "@mobiscroll/react";
import { Component } from "react";
import { toast } from "react-toastify";

export default class CalenderController extends Component {
  constructor(props: any) {
    super(props);

    this.saveEvent = this.saveEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.loadPopupForm = this.loadPopupForm.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSelectedDateChange = this.onSelectedDateChange.bind(this);
    this.onEventClick = this.onEventClick.bind(this);
    this.onEventCreated = this.onEventCreated.bind(this);
    this.onEventDeleted = this.onEventDeleted.bind(this);
    this.onEventUpdated = this.onEventUpdated.bind(this);
  }
  state: any = {
    myEvents: [],
    tempEvent: null,
    isOpen: false,
    isEdit: false,
    anchor: null,
    start: null,
    end: null,
    popupEventTitle: "",
    popupEventDescription: "",
    popupEventStatus: "busy",
    mySelectedDate: new Date(),
  };

  componentDidMount() {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events: any) => {
        this.setState({ myEvents: events });
      },
      "jsonp"
    );
  }

  saveEvent() {
    const {
      myEvents,
      tempEvent,
      popupEventTitle,
      popupEventDescription,
      popupEventDate,
      popupEventStatus,
      isEdit,
    } = this.state;

    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      description: popupEventDescription,
      status: popupEventStatus,
    };

    if (isEdit) {
      const index = myEvents.findIndex((x: any) => x.id === tempEvent.id);
      const newEventList = [...myEvents];
      newEventList.splice(index, 1, newEvent);
      this.setState({ myEvents: newEventList });
    } else {
      this.setState({ myEvents: [...myEvents, newEvent] });
    }

    this.setState({ selectedDate: popupEventDate[0], isOpen: false });
  }

  deleteEvent(event: any) {
    const { myEvents } = this.state;
    const filteredEvents = myEvents.filter((item: any) => item.id !== event.id);
    this.setState({ myEvents: filteredEvents });

    setTimeout(() => {
      toast({
        button: {
          action: () => {
            this.setState({ myEvents: [...filteredEvents, event] });
          },
          text: "Undo",
        },
        message: "Event deleted",
      });
    });
  }

  loadPopupForm(event: any) {
    this.setState({
      popupEventTitle: event.title,
      popupEventDescription: event.description,
      popupEventDate: [event.start, event.end],
      popupEventAllDay: event.allDay || false,
      popupEventStatus: event.status || "busy",
    });
  }

  titleChange(ev: any) {
    this.setState({ popupEventTitle: ev.target.value });
  }

  descriptionChange(ev: any) {
    this.setState({ popupEventDescription: ev.target.value });
  }

  statusChange(ev: any) {
    this.setState({ popupEventStatus: ev.target.value });
  }

  onDeleteClick() {
    const { tempEvent } = this.state;
    this.deleteEvent(tempEvent);
    this.setState({ isOpen: false });
  }

  onSelectedDateChange(event: any) {
    this.setState({ selectedDate: event.date });
  }

  onEventClick(args: any) {
    this.setState({
      isEdit: true,
      tempEvent: { ...args.event },
    });
    this.loadPopupForm(args.event);
    this.setState({
      anchor: args.domEvent.target,
      isOpen: true,
    });
  }

  onEventCreated(args: any) {
    this.setState({
      isEdit: false,
      tempEvent: args.event,
    });
    this.loadPopupForm(args.event);
    this.setState({
      anchor: args.target,
      isOpen: true,
    });
  }

  onEventDeleted(args: any) {
    this.deleteEvent(args.event);
  }

  onEventUpdated(args: any) {
    // Here you can update the event in your storage after drag & drop or resize
    // ...
  }

  onClose() {
    const { isEdit, myEvents } = this.state;
    if (!isEdit) {
      this.setState({ myEvents: [...myEvents] });
    }
    this.setState({ isOpen: false });
  }
}
