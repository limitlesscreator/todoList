import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", active: false},
            {id: "2", title: "JS", active: true},
            {id: "3", title: "React", active: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", active: false},
            {id: "2", title: "milk", active: true},
            {id: "3", title: "tea", active: false}
        ]
    };

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", active: false},
            {id: "2", title: "JS", active: true},
            {id: "3", title: "React", active: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", active: false},
            {id: "3", title: "tea", active: false}
        ]
    });

});


test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", active: false},
            {id: "2", title: "JS", active: true},
            {id: "3", title: "React", active: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", active: false},
            {id: "2", title: "milk", active: true},
            {id: "3", title: "tea", active: false}
        ]
    };

    const action = addTaskAC("todolistId2", "juce");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].active).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", active: false},
            {id: "2", title: "JS", active: true},
            {id: "3", title: "React", active: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", active: false},
            {id: "2", title: "milk", active: true},
            {id: "3", title: "tea", active: false}
        ]
    };

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].active).toBe(false);
    expect(endState["todolistId1"][1].active).toBe(true);
    expect(endState["todolistId2"][1].title).toBe("milk");
    expect(endState["todolistId2"][1].id).toBe("2");
});

test("title of task should be changed", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", active: false},
            {id: "2", title: "JS", active: true},
            {id: "3", title: "React", active: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", active: false},
            {id: "2", title: "milk", active: true},
            {id: "3", title: "tea", active: false}
        ]
    };
    const newTitle = "Hello"

    const action = changeTaskTitleAC("1", newTitle, "todolistId1");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][0].title).toBe("Hello");
    expect(endState["todolistId2"][0].title).toBe("bread");
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", active: false},
            {id: "2", title: "JS", active: true},
            {id: "3", title: "React", active: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", active: false},
            {id: "2", title: "milk", active: true},
            {id: "3", title: "tea", active: false}
        ]
    };

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
