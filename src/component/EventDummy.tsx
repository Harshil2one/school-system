import React, { Component } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, setOptions, Toast } from "@mobiscroll/react";

export class EventDummy extends Component {
  constructor(props: any) {
    super(props);

    this.handleEventClick = this.handleEventClick.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
  }

  state: any = {
    myEvents: [],
    isToastOpen: false,
    toastMessage: "",
  };

  componentDidMount() {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        this.setState({ myEvents: events.slice(0, 1) });
      },
      "jsonp"
    );
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: any): void {
    setOptions({
      theme: "material",
      themeVariant: JSON.parse(localStorage.getItem("theme") || "{}"),
    });
  }

  handleToastClose() {
    this.setState({ isToastOpen: false });
  }

  handleEventClick(args: any) {
    this.setState({ toastMessage: args.event.title, isToastOpen: true });
  }

  updateEvents(args: any) {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        this.setState({
          myEvents: events
            .filter((el: any) => new Date(el.start) >= new Date(args.date))
            .slice(0, 1),
        });
      },
      "jsonp"
    );
  }

  render() {
    const { myEvents, isToastOpen, toastMessage } = this.state;

    const myView: any = {
      calendar: { type: "month" },
      agenda: { type: "month" },
    };

    return (
      <>
        <Eventcalendar
          data={myEvents}
          view={myView}
          onEventClick={this.handleEventClick}
          onCellClick={this.updateEvents}
        />
        <Toast
          message={toastMessage}
          isOpen={isToastOpen}
          onClose={this.handleToastClose}
        />
      </>
    );
  }
}
