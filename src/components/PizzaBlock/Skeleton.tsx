import ContentLoader from 'react-content-loader';

const Skeleton = (props:any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="114" r="98" />
    <rect x="202" y="287" rx="0" ry="0" width="17" height="1" />
    <rect x="6" y="231" rx="13" ry="13" width="265" height="27" />
    <rect x="4" y="277" rx="15" ry="15" width="269" height="96" />
    <rect x="8" y="401" rx="14" ry="14" width="94" height="32" />
    <rect x="113" y="442" rx="0" ry="0" width="2" height="9" />
    <rect x="128" y="392" rx="23" ry="23" width="145" height="49" />
  </ContentLoader>
);

export default Skeleton;
