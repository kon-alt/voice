import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {alertTypes, showAlert} from '../../../store/app.slice';
import api from '../../../api';
import {handleError} from '../../../helpers/handleError';
import {
    IById, IContent,
    IContentItemList,
    IContentListResponse,
    IIntegrationRequest,
    IProject,
    IProjectList,
    IProjectListItem,
    IProjectResponse
} from './types';


interface ICreateProjectResponse {
    data: {
        id: string;
    }
}

interface IState {
    data: IProject;
    projectList: IProjectListItem[];
    contentList: IContentItemList[];
    content: IContent;
    loader: boolean;
}

const initialState: IState = {
    data: {
        project: {
            id: '',
            name: '',
            webhook_url: '',
        },
        integration: {
            project_id: '',
            type: '',
            voice: '',
            url: '',
        },
        player: {
            project_id: '',
            title: '',
            padding: 0,
            border_radius: 0,
            main_color: '',
            text_color: '#000000',
            title_color: '',
            border_color: '',
            background_color: '',
        }
    },
    projectList: [],
    contentList: [],
    content: {
        id: '',
        title: '',
        symbols: 0,
        mp3: '',
        m3u8: '',
        source: '',
        url: '',
        status: 0,
        created_at: '',
    },
    loader: false
};


export const createProject = createAsyncThunk(
    'project/createProject',
    async ({name, navigate}: { name: string, navigate: any }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;
            const res = await api.post<ICreateProjectResponse>('/project/create', {name}, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            const {id} = await res.data.data;

            const response = await api.get<IProjectResponse>(`/project/info/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            navigate('/project-create');
            return response.data.data;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const updateProjectName = createAsyncThunk(
    'project/updateProjectName',
    async ({name, id}: {name:string, id:string}, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;

            const res = await api.put<IProjectResponse>(`/project/name/${id}`,  {name}, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            dispatch(showAlert({type: alertTypes.SUCCESS, message: 'Успешно обновили имя проекта', show: true}));
            return res.data.data;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const getMyProjects = createAsyncThunk(
    'project/getMyProjects',
    async (_, {dispatch}) => {
        try {
            const res = await api.get<IProjectList>('project/list');
            return !res.data?.length ? res.data.data : [];
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const getProjectById = createAsyncThunk(
    'project/getProjectById',
    async ({id, navigate}: IById, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;

            const res = await api.get<IProjectResponse>(`/project/info/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            navigate('/project-create?edit');
            return res.data.data;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const updateProject = createAsyncThunk(
    'project/updateProject',
    async ({project_id, player, integration}: IIntegrationRequest, {dispatch, getState}) => {
        try {
            const {auth, project} = getState() as any;

            await api.put(`/integration/update/${project_id}`, integration, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });

            await api.put(`/player/update/${project_id}`, player, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });

            await api.put<IProjectResponse>(`/project/name/${project_id}`,  {name: project.data.project.name}, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });

            dispatch(showAlert({type: alertTypes.SUCCESS, message: 'Успешно обновили', show: true}));
            return;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const projectDelete = createAsyncThunk(
    'project/projectDelete',
    async ({id}: { id: string }, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;

            const res = await api.delete<IProjectResponse>(`/project/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            dispatch(showAlert({type: alertTypes.SUCCESS, message: 'Успешно удалено', show: true}));
            dispatch(getMyProjects());
            return res.data.data;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const getContentByProjectId = createAsyncThunk(
    'project/getContentByProjectId',
    async ({id, navigate}: IById, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;

            const res = await api.get<IContentListResponse>(`/content/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            navigate('/project');
            return res.data.data ?? [];
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const getContentById = createAsyncThunk(
    'project/getContentById',
    async ({id, navigate}: IById, {dispatch, getState}) => {
        try {
            const {auth} = getState() as any;

            const res = await api.get<IContentListResponse>(`/content/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            navigate('/project-content');
            return res.data.data ?? [];
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

export const deleteContent = createAsyncThunk(
    'project/deleteContent',
    async ({id}: { id: string }, {dispatch, getState}) => {
        try {
            const {auth, project} = getState() as any;
            const {project_id} = project.data.integration;

            const res = await api.delete(`/content/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            dispatch(showAlert({type: alertTypes.SUCCESS, message: 'Успешно удалено', show: true}));
            dispatch(getContentByProjectId({id: project_id}));
            return res.data.data;
        } catch (e: any) {
            handleError(e, dispatch);
        }
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectName: (state, {payload}) => {
            state.data.project.name = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(createProject.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(createProject.fulfilled, (state, {payload}: { payload: any }) => {
            state.loader = false;
            state.data.project = payload.project;
            state.data.integration = payload.integration;
            state.data.player = payload.player;
        });
        builder.addCase(getProjectById.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getProjectById.fulfilled, (state, {payload}: { payload: any }) => {
            state.loader = false;
            state.data.project = payload.project;
            state.data.integration = payload.integration;
            state.data.player = payload.player;
        });

        builder.addCase(getMyProjects.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getMyProjects.fulfilled, (state, {payload}: { payload: any }) => {
            state.loader = false;
            state.projectList = payload;
        });
        builder.addCase(getMyProjects.rejected, (state) => {
            state.loader = false;
            state.projectList = [];
        });

        builder.addCase(getContentByProjectId.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getContentByProjectId.fulfilled, (state, {payload}: { payload: any }) => {
            state.loader = false;
            state.contentList = payload;
        });
        builder.addCase(getContentByProjectId.rejected, (state) => {
            state.loader = false;
            state.projectList = [];
        });

        builder.addCase(getContentById.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(getContentById.fulfilled, (state, {payload}: { payload: any }) => {
            state.loader = false;
            state.content.id = payload.id;
            state.content.title = payload.title;
            state.content.symbols = payload.symbols;
            state.content.mp3 = payload.mp3;
            state.content.m3u8 = payload.m3u8;
            state.content.source = payload.source;
            state.content.url = payload.url;
            state.content.status = payload.status;
            state.content.created_at = payload.created_at;
        });
        builder.addCase(getContentById.rejected, (state) => {
            state.loader = false;
        });
        builder.addCase(updateProjectName.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(updateProjectName.fulfilled, (state, {payload}:any) => {
            state.loader = false;
            state.data.project.name = payload;
        });
        builder.addCase(updateProjectName.rejected, (state, {payload}:any) => {
            state.loader = false;
        });
    }
});

export const {setProjectName} = projectSlice.actions;

export default projectSlice.reducer;
