export const formatMovieDuration = durationInMinutes => {
  let hours = parseInt(durationInMinutes / 60);
  hours = (!hours) ? "" : `${hours}ч `;
  let minutes = durationInMinutes % 60;
  minutes = (!minutes) ? "" : `${minutes}м`;
  return `${hours}${minutes}`
};
