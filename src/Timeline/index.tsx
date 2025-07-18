import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Timeline({ data }: { data: any }) {
  return (
    <div>
      <VerticalTimeline {...data.timelineProps}>
        {data.timeList.map((item: any) => {
          return <VerticalTimelineElement {...item}>{item.content}</VerticalTimelineElement>;
        })}
      </VerticalTimeline>
    </div>
  );
}
