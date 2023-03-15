import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API, ERROR, LOADING } from "./Index";
import { ORDER_STATUSES } from "../constant/Constants";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";
import axios from 'axios';
export const LeadContext = React.createContext()

const LeadProvider = ({ children }) => {

    const { setLoading } = useContext(AppContext)
    const [GetLead, setLead] = useState(LOADING)
    const [timeValue, settimeValue] = useState('')
    const [GetLeadId, setLeadId] = useState(LOADING)
    const [GetCountry, setCountry] = useState(LOADING)
    const [GetStateList, setState] = useState(LOADING)
    const [GetDelete, setDelete] = useState(LOADING)
    const [GetContactList, setContactList] = useState(LOADING)
    const [GetTaskList, setTaskList] = useState(LOADING)
    const [GetQuestion, setQuestion] = useState(LOADING)
    const [Getgraph, setgraph] = useState(LOADING)
    const [GetStatus, setStatus] = useState(LOADING)
    const [GetDndStatusChange, setDndStatusChange] = useState(LOADING)
    const [GetNoteStatus, setNoteStatus] = useState(LOADING)
    const [GetDashBoardValue, setDashBoardValue] = useState(LOADING)
    const [GetAppointmentValue, setAppointmentValue] = useState(LOADING)
    const [GetMeetingList, setMeetingList] = useState(LOADING)
    const [GetLeadEditDetails, setLeadEditDetails] = useState(LOADING)
    const [GetAppointmentdetails, setAppointmentdetails] = useState(LOADING)
    const [GetAbout, setAbout] = useState(LOADING)
    const [LibraryVideo, setLibraryvideo] = useState(LOADING)
    const [GetGraphdata, setGraphdata] = useState(LOADING)
    const [date, setDate] = useState(new Date());
    const [submitQuizresult, setsubmitQuiz] = useState(LOADING)
    const [Getactivity, setactivity] = useState(LOADING)
    const [Getnotes, setnotes] = useState(LOADING)
    const [UpdateNote, setUpdateNote] = useState(LOADING)
    const [TaskStatus, setTaskStatus] = useState(LOADING)
    const [GetOpportunitiesdata, setOpportunitiesdata] = useState(LOADING)
    const [GetConversiondata, setConversiondata] = useState(LOADING)
    const [GetpipelineData, setpipelineData] = useState(LOADING)
    const [Dashconversiondata, setDashConversiondata] = useState(LOADING)
    const [color, setColor] = useState('transparent');
    const [controllerValue, setcontrollerValue] = useState('')
    const [tabs, settabs] = useState({active:true,id:1})
    const [PipelineList, setPipelineList] = useState(LOADING)
    const [StageList, setStageList] = useState(LOADING)
    const [stageid, setstageid] = useState('')
    const [offSet, setoffSet] = useState(2)
    const [listData, setlistData] = useState(LOADING)
    const [GetAddress, setAddress] = useState(LOADING)
    const [markerLocation, setmarkerLocation] = useState('')
    const [appointmentByLead, setappointmentByLead] = useState(LOADING)
    const [GetTimeZone, setTimeZone] = useState(LOADING)
    const API_CALLS = {
        getLead: async (params, onSuccess) => API.get('lead?'+ new URLSearchParams({ ...params, db: ''  }).toString()).then(res => {
            setLead(res.data)
        }),
        getTaskListById: async (params, onSuccess) => API.get('taskByLeadId/' +params.id).then(res => {
            setlistData(res.data)
          
        }),
       
        getLeadEditId: async (params, onSuccess) => API.get('lead/' + params.id).then(res => {
            setLeadId(res.data)
        }),
        getRecentActivity: async (params, onSuccess) => API.get('recentActivities?' + params.id).then(res => {

            setactivity(res.data.data.data)
        }),
        getContact: async (params, onSuccess) => API.post('listOfContactAssignedLeadList?', params).then(res => {
            setContactList(res.data)
        }),
        getAddress: async (params, onSuccess) => API.post('getAddress?', params).then(res => {
            setAddress(res.data.data)
        }),
        getDashBoardGraph: async (params, onSuccess) => API.post('dashboardGraph?', params).then(res => {

            setgraph(res.data.data)
        }),
        getTimeZoneList: async (params, onSuccess) => API.get('timeZone?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setTimeZone(res.data)
        }),
        getTask: async (params, onSuccess) => API.get('task?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setTaskList(res.data)
        }),
        getCountry: async (params, onSuccess) => API.get('country?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setCountry(res.data.data)
        }),
        getAddNote: async (params, onSuccess) => API.post('add-note?', params).then(res => {


        }),
        getAddStatus: async (params, onSuccess) => API.post('taskStatusManaged?', params).then(res => {

        }),
        getState: async (params, onSuccess) => API.post('state?', params).then(res => {
            setState(res.data.data)
        }),
        getNotesHistory: async (params, onSuccess) => API.post('noteHistory?', params).then(res => {
            setnotes(res.data.data)
        }),
        getLeadStatus: async (params, onSuccess) => API.get('getLeadStatus?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setStatus(res.data)
        }),
        getStatusNote: async (params, onSuccess) => API.get('taskStatusList?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setNoteStatus(res.data.data)
        }),
        getDashBoard: async (params, onSuccess) => API.get('dashboard?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setDashBoardValue(res.data)
        }),
        getMeetingWithLeadList: async (params, onSuccess) => API.get('allLeadList?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setMeetingList(res.data.data)
        }),
        getDndStatus: async (params, onSuccess) => API.post('dndStatusManaged?', params).then(res => {

            setDndStatusChange(res.data.data)
        }),
        addLead: async (params, onSuccess) => await API.post('lead?', params).then(res => {

            API_CALLS.getLead({
                params: {}, onSuccess: () => {
                }
            })
        }),
        addAppointment: async (params, onSuccess) => await API.post('appointment?', params).then(res => {
            API_CALLS.getAppointment({
                params: {}, onSuccess: () => {
                }
            })

        }),
        getAppointment: async (params, onSuccess) => API.get('appointment?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => {
            setAppointmentValue(res.data)
        }),
        deleteLead: async (params, onSuccess) => await API.delete('lead/' + params.id).then(res => {
          
        }),
        deleteNote: async (params, onSuccess) => await API.post('delete-Note', params).then(res => {

        
        }),
        updateNote: async (params, onSuccess) => await API.post('edit-Note', params).then(res => {

            setUpdateNote(res.data)
            

        }),
        GeteditDetails: async (params, onSuccess) => await API.get('lead/' + params.id).then(res => {

            setLeadEditDetails(res.data.data);
        }),
        updateLead: async (params, onSuccess) => await API.patch('lead/' + params.id, params).then(res => {
            API_CALLS.getLead({
                params: {}, onSuccess: () => {
                }
            })
            setLeadEditDetails(res.data)
        }),
        getLeadUpdate: async (params, onSuccess) => await API.post('update-contact-details', params).then(res => {
            setLeadId(res.data)
            API_CALLS.getQuestionList({
                params: {}, onSuccess: () => {
                }
            })
        }),
        submitQuiz: async (params, onSuccess) => await API.post('submitQuiz', params).then(res => {

            setsubmitQuiz(res.data)

        }),
        getEditAppointmentdetails: async (params, onSuccess) => await API.get('appointment/' + params.id).then(res => {
            setAppointmentdetails(res.data.data)
        }),
        AppointmentUpdate: async (params, onSuccess) => await API.patch('appointment/' + params.id, params).then(res => {
            setAppointmentdetails(res.data.data)
            API_CALLS.getAppointment({
                params: {}, onSuccess: () => {
                }
            })
        }),

        GetAboutDetail: async (params, onSuccess) => await API.get('about').then(res => {
            setAbout(res.data)
        }),
        GetVideoLibrary: async (params, onSuccess) => await API.get('video/').then(res => {
            setLibraryvideo(res.data)
        }),
        GetStaffGraph: async (params, onSuccess) => await API.post('entireStaffDetails', params).then(res => {
            setGraphdata(res.data.data)
        }),

        dashboardGraph: async (params, onSuccess) => await API.post('dashboardGraph', params).then(res => {
            setDashConversiondata(res.data.data)
        }),

        GetConversionGraph: async (params, onSuccess) => await API.post('conversionRate', params).then(res => {
            setConversiondata(res.data.data)
        }),
        GetOpportunitiesGraph: async (params, onSuccess) => await API.post('opportunities', params).then(res => {
            setOpportunitiesdata(res.data.data)
        }),
        GetPipelineGraph: async (params, onSuccess) => await API.post('pipeline', params).then(res => {
            setpipelineData(res.data.data)
        }),
        GetStageList: async (params, onSuccess) => await API.post('getPipelineById', params).then(res => {
            setStageList(res.data.data)
        }),
        recentActivities: async (params, onSuccess) => await API.get('recentActivities', params).then(res => {
            setactivity(res.data.data.data)
        }),
        getQuestionList: async (params, onSuccess) => API.get('quizzes/' + params.video_id).then(res => {
            setQuestion(res.data.data)
        }),
        getPipelineList: async (params, onSuccess) => API.get('getAllPipeline' , params).then(res => {
            setPipelineList(res.data)
        }),
        GetAllAppointmentByLead: async (params, onSuccess) => await API.post('getAllAppointmentByLead', params).then(res => {
            setappointmentByLead(res.data)
        }),
        Posttoken: async (params, onSuccess) => {

            API.post('addCal', params).then(res => {

                onSuccess(res)
            })
        },
    }
    return (
        <LeadContext.Provider value={{
            API_CALLS,
            GetLead,
            GetStatus,
            GetCountry,
            GetStateList,
            GetDelete,
            GetContactList,
            GetTaskList,
            Getgraph,
            GetLeadId,
            GetDndStatusChange,
            GetNoteStatus,
            GetAppointmentValue,
            GetMeetingList,
            GetTimeZone,
             setTimeZone,
            GetDashBoardValue,
            GetLeadEditDetails,
            stageid, setstageid,
            GetAppointmentdetails,
            GetAbout,GetAddress,
            setAddress,
            LibraryVideo,
            GetGraphdata,
            GetQuestion,
            date,listData,
            setlistData,
            submitQuizresult,
            Getnotes,
            markerLocation, setmarkerLocation,
            Getactivity,
            setDate,offSet, setoffSet,
            controllerValue, 
            setcontrollerValue,
            appointmentByLead,
             setappointmentByLead,
            GetConversiondata,
            GetOpportunitiesdata,
            GetpipelineData,
            UpdateNote,
            TaskStatus,
            tabs,timeValue, settimeValue,
             settabs,
             PipelineList, 
             setPipelineList,
             StageList, 
             setStageList,
            Dashconversiondata,
            color, 
            setColor
        }}  >
            {children}
        </LeadContext.Provider>
    )
}

export default LeadProvider