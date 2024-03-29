import React, {useState} from 'react';
import moment from 'moment'
import events from '../hooks/events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Add from '@containers/Add';
import AddButton from '@components/AddButton'
import Categories from '@components/Categories.jsx';
import '@styles/Calendar.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

Calendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

function EventAgenda({event}) {
	if(event.course == "Mathematics") {
		return (
			<span>
				<em style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{event.title}</em>
				<p>{event.desc}</p>
				<p style={{color: 'red', fontWeight: 'bold', fontSize: '20px'}}>{event.course}</p>
			</span>
		)
	} else if(event.course == "History") {
		return (
			<span>
				<em style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{event.title}</em>
				<p>{event.desc}</p>
				<p style={{color: 'rgb(5, 126, 35)', fontWeight: 'bold', fontSize: '20px'}}>{event.course}</p>
			</span>
		)
	} else if(event.course == "Communication") {
		return (
			<span>
				<em style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{event.title}</em>
				<p>{event.desc}</p>
				<p style={{color: 'rgb(255, 145,0)', fontWeight: 'bold', fontSize: '20px'}}>{event.course}</p>
			</span>
		)
	} else if(event.course == "Artistic expression") {
		return (
			<span>
				<em style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{event.title}</em>
				<p>{event.desc}</p>
				<p style={{color: 'rgb(207, 0, 226)', fontWeight: 'bold', fontSize: '20px'}}>{event.course}</p>
			</span>
		)
	} else if(event.course == "Computing") {
		return (
			<span>
				<em style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{event.title}</em>
				<p>{event.desc}</p>
				<p style={{color: 'blue', fontWeight: 'bold', fontSize: '20px'}}>{event.course}</p>
			</span>
		)
	} else {
		return (
			<span>
				<em style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{event.title}</em>
				<p>{event.desc}</p>
				<p id="cour">{event.course}</p>
			</span>
		)
	}
}


class Dnd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: events,
			isOpen: false,
		};

		this.moveEvent = this.moveEvent.bind(this);
	}

	moveEvent({ event, start, end }) {
		const { events } = this.state;
		const idx = events.indexOf(event);
		const updatedEvent = { ...event, start, end};

		const nextEvents = [...events];
		nextEvents.splice(idx, 1, updatedEvent);


	}

	resizeEvent = (resizeType, { event, start, end }) => {
		const {events } = this.state;

		const nextEvents = events.map(existingEvent => {
			return existingEvent.id == event.id ? { ...existingEvent, start, end } : existingEvent;
		});

		this.setState({
			events: nextEvents
		});
	}


	handleSelect = ({event, start, end }) => {
    // const title = window.prompt('New Event name')

		 this.setState({
			isOpen: true
		})
    // if (title)
    //   this.setState({
    //     events: [
    //       ...this.state.events,
    //       {
    //         start,
    //         end,
    //         title,
    //     },
    //   ],
    // })
  }

	handleOpen = () => this.setState({
			isOpen: true
		})
	handleClose = () => this.setState({
			isOpen: false
		})

	render() {
		return (
			<div style={{ height: `${900}px` }} className="bigCalendar-container">
				<DragAndDropCalendar
					className="calendar"
					selectable
					events={this.state.events}
					onEventDrop={this.moveEvent}
					resizable
					scrollToTime={new Date(1970, 1, 1, 6)}
					onEventResize={this.resizeEvent}
					defaultView={Calendar.Views.MONTH}
					defaultDate={new Date(new Date().setHours(new Date().getHours() - 3))}
					onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
					components={{
      			event: Event,
      			agenda: {
        			event: EventAgenda,
      			},
    			}}
					messages={{
					next:"Sig",
					previous:"Ant",
					today:"Today",
					month:"Month",
					week:"Week",
					day:"Day"
					}}
				/>
				{/* <MenuContainer>
						<AddButton />
						<Categories />
				</MenuContainer>
				<Modal isOpen></Modal> */}
				<Add className="add" isOpen={this.state.isOpen} handleOpen={this.handleOpen} handleClose={this.handleClose}>
					<AddButton />
					<Categories />
				</Add>
			</div>
		);
	}
}

const Calendario = DragDropContext(HTML5Backend)(Dnd);

export default Calendario;
