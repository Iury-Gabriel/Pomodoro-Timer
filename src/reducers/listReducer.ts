import { Item } from "../types/Item";

type AddAction = {
    type: 'add';
    payload: {
        text: string;
    };
};

type EditTextAction = {
    type: 'editText';
    payload: {
        id: number;
        newText: string;
    };
};

type ToggleDoneAction = {
    type: 'toggleDone';
    payload: {
        id: number;
    };
};

type RemoveAction = {
    type: 'remove';
    payload: {
        id: number;
    };
};

type ClearAllAction = {
    type: 'clearAll';
};

type ClearDoneAction = {
    type: 'clearDone';
};

type DoneAllAction = {
    type: 'doneAll';
};

type ListActions =
    | AddAction
    | EditTextAction
    | ToggleDoneAction
    | RemoveAction
    | ClearAllAction
    | DoneAllAction
    | ClearDoneAction;

export const listReducer = (list: Item[], action: ListActions) => {
    switch (action.type) {
        case 'add':
            return [
                ...list,
                {
                    id: list.length,
                    text: action.payload.text,
                    done: false
                }
            ];

        case 'editText':
            return list.map(t => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        text: action.payload.newText
                    };
                }
                return t;
            });

        case 'toggleDone':
            return list.map((t) => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        done: !t.done,
                    };
                }
                return t;
            });

        case 'remove':
            return list.filter(t => t.id !== action.payload.id);

        case 'clearAll':
            return [];

        case 'doneAll':
            return list.map(task => ({
                ...task,
                done: true,
            }));

        case 'clearDone':
            return list.filter(task => task.done === false);

        default:
            return list;
    }
};
