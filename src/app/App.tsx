import { PeopleCard } from '@/widgets/people-card'
import { PersonPopup } from '@/widgets/person-popup'
import { Todos } from '@/widgets/todos'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <h4 className="system-typo-h4">Todo List</h4>
      <Todos />

      <h4 className="system-typo-h4">Async List</h4>
      <PeopleCard />

      <h4 className="system-typo-h4">Modal Queue</h4>
      <PersonPopup />
    </div>
  )
}

export default App
