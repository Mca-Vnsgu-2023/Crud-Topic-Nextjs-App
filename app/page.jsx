import TopicList from '../components/Topics/index'
import ProtectedRoute from '../components/ProtectedRoute'

export default function Home() {
  return (
    <ProtectedRoute>
      <div style={{ paddingTop: '15px' }}>
       <TopicList />
      </div>
    </ProtectedRoute>
  )
}
