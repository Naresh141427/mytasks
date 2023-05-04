import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

const Tasks = ({tagsList}) => {
  const [tagsDetailsList, setTagsDetailsList] = useState(
    tagsList.map(tag => ({...tag, isClicked: false})),
  )
  const [menuValue, setMenuValue] = useState(tagsList[0].optionId)
  const [taskName, setTaskName] = useState('')
  const [taskList, setTaskList] = useState([])
  const [filteredTaskList, setFilteredTaskList] = useState([])

  const onChangeDropDown = event => {
    setMenuValue(event.target.value)
  }

  const onChangeTask = event => {
    setTaskName(event.target.value)
  }

  const onAddingTasks = event => {
    event.preventDefault()

    const newTask = {
      id: uuidv4(),
      name: taskName,
      category: menuValue,
    }

    setTaskList(prevTaskList => [...prevTaskList, newTask])
    setFilteredTaskList(prevFilteredTaskList => [
      ...prevFilteredTaskList,
      newTask,
    ])
    setTaskName('')
  }

  const onClickingTag = event => {
    const clickedTag = event.target.textContent

    const updatedTagsDetailsList = tagsDetailsList.map(tag =>
      tag.displayText === clickedTag
        ? {...tag, isClicked: !tag.isClicked}
        : tag,
    )
    setTagsDetailsList(updatedTagsDetailsList)

    const activeTags = updatedTagsDetailsList.filter(tag => tag.isClicked)
    if (activeTags.length === 0) {
      setFilteredTaskList(taskList)
    } else {
      const filteredTasks = taskList.filter(task =>
        activeTags.some(tag => tag.optionId === task.category),
      )
      setFilteredTaskList(filteredTasks)
    }
  }

  return (
    <div className="app-container">
      <div className="task-container">
        <h1 className="header">Create a task!</h1>
        <form className="form" onSubmit={onAddingTasks}>
          <label htmlFor="Task" className="label">
            Task
          </label>
          <input
            id="Task"
            type="text"
            className="input"
            placeholder="Enter the task here"
            value={taskName}
            onChange={onChangeTask}
          />
          <label className="label" htmlFor="Tags">
            Tags
          </label>
          <select
            className="drop-down"
            defaultValue={tagsList[0].optionId}
            onChange={onChangeDropDown}
            id="Tags"
          >
            {tagsList.map(each => (
              <option className="option" value={each.optionId} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          <div className="button-container">
            <button className="button" type="submit">
              Add Task
            </button>
          </div>
        </form>
      </div>

      <div className="list-container">
        <h1 className="tags">Tags</h1>
        <ul className="list">
          {tagsDetailsList.map(each => (
            <li className="item" key={each.id}>
              <button
                type="button"
                className={each.isClicked ? 'active-tag-button' : 'tag-button'}
                onClick={onClickingTag}
              >
                {each.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="task-title">Tasks</h1>
        {filteredTaskList.length > 0 ? (
          <ul className="tasks-list">
            {filteredTaskList.map(each => (
              <li key={each.id} className="list-item">
                <p className="task-name">{each.name}</p>
                <button className="task-button" type="button">
                  {each.category}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-container">
            <p className="empty">No Tasks Added Yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
