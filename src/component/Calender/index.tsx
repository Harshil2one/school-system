import React from "react";
import {
  Eventcalendar,
  setOptions,
  Popup,
  Button,
  Input,
  Textarea,
  SegmentedGroup,
  SegmentedItem,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import CalenderController from "./CalenderController";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

export default class Calender extends CalenderController {
  render() {
    const {
      myEvents,
      isOpen,
      isEdit,
      anchor,
      popupEventTitle,
      popupEventDescription,
      popupEventStatus,
      mySelectedDate,
    } = this.state;

    const headerText: string = isEdit ? "Edit event" : "New Event";
    const popupButtons: any = isEdit
      ? [
          {
            handler: () => {
              this.saveEvent();
            },
            keyCode: "enter",
            text: "Save",
            cssClass: "mbsc-popup-button-primary",
          },
        ]
      : [
          {
            handler: () => {
              this.saveEvent();
            },
            keyCode: "enter",
            text: "Add",
            cssClass: "mbsc-popup-button-primary",
          },
        ];

    return (
      <>
        <Eventcalendar
          view={{
            calendar: { labels: true },
          }}
          data={myEvents}
          clickToCreate="single"
          dragToMove={true}
          dragToResize={true}
          selectedDate={mySelectedDate}
          onSelectedDateChange={this.onSelectedDateChange}
          onEventClick={this.onEventClick}
          onEventCreated={this.onEventCreated}
          onEventDeleted={this.onEventDeleted}
          onEventUpdated={this.onEventUpdated}
        />
        <Popup
          display="bottom"
          fullScreen={true}
          contentPadding={false}
          headerText={headerText}
          anchor={anchor}
          buttons={popupButtons}
          isOpen={isOpen}
          onClose={this.onClose}
          responsive={responsivePopup}
        >
          <div className="mbsc-form-group">
            <Input
              label="Title"
              value={popupEventTitle}
              onChange={this.titleChange}
            />
            <Textarea
              label="Description"
              value={popupEventDescription}
              onChange={this.descriptionChange}
            />
          </div>
          <div className="mbsc-form-group">
            <SegmentedGroup onChange={this.statusChange}>
              <SegmentedItem value="busy" checked={popupEventStatus === "busy"}>
                Show as busy
              </SegmentedItem>
              <SegmentedItem value="free" checked={popupEventStatus === "free"}>
                Show as free
              </SegmentedItem>
            </SegmentedGroup>
            {isEdit ? (
              <div className="mbsc-button-group">
                <Button
                  className="mbsc-button-block"
                  color="danger"
                  variant="outline"
                  onClick={this.onDeleteClick}
                >
                  Delete event
                </Button>
              </div>
            ) : null}
          </div>
        </Popup>
      </>
    );
  }
}
