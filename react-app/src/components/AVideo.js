function AVideo({title, bgColor}) {
  //console.log("Avideo called ", props);
  return (
    <div>
      <img src="https://placebeard.it/360x160" alt="Gilman Gilberth" />
      <div style={{backgroundColor: bgColor}}>{title}</div>
    </div>
  );
}

export default AVideo;
