import Image from 'next/image'
import styles from './page.module.css'
import TopicList from '../components/TopicList'

export default function Home() {
  return (
    <div style={{paddingTop: '15px'}}>
      <TopicList />
    </div>
  )
}
