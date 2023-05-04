import './App.css'
import Tasks from './Components/Tasks'
// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    id: 1,
    optionId: 'HEALTH',
    displayText: 'Health',
    isClicked: false,
  },
  {
    id: 2,
    optionId: 'EDUCATION',
    displayText: 'Education',
    isClicked: false,
  },
  {
    id: 3,
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isClicked: false,
  },
  {
    id: 4,
    optionId: 'SPORTS',
    displayText: 'Sports',
    isClicked: false,
  },
  {
    id: 5,
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isClicked: false,
  },
  {
    id: 6,
    optionId: 'OTHERS',
    displayText: 'Others',
    isClicked: false,
  },
]

// Replace your code here
const App = () => <Tasks tagsList={tagsList} />

export default App
