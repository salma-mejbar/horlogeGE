import './index.css';
import { Watch } from './classes/watch';
import { TimeFormat } from './classes/timeFormat';

const watches: Watch[] = [];

const watch1 = new Watch(new Date());
const watch2 = new Watch(new Date());
watches.push(watch1);
watches.push(watch2);

const watchesContainer = document.querySelector('.container');

watches.forEach((watch, index) => {

    //Create html for each watch
    const watchElement = document.createElement('div');
    watchElement.className = 'watch';
    watchElement.innerHTML = `
      <div class="time" id="time-${index}">
        <span id="hours-${index}">${watch.getTime().getHours()}</span>:
        <span id="minutes-${index}">${watch.getTime().getMinutes()}</span>
        <div>
          <span class="AM-PM" id="AM-PM-${index}"></span>
          <span class= "seconds" id="seconds-${index}">${watch.getTime().getSeconds()}</span>
        </div>     
      </div>
      <select class="timezone-select" id="timezone-select-${index}">
        <option value="Europe/Paris">Europe/Paris</option>
        <option value="Europe/London">Europe/London</option>
        <option value="Europe/Moscow">Europe/Moscow</option>
        <option value="Asia/Kolkata">Asia/Kolkata</option>
        <option value="Asia/Dubai">Asia/Dubai</option>
        <option value="America/Los_Angeles">America/Los_Angeles</option>
        <option value="America/Sao_Paulo">America/Sao_Paulo</option>
        <option value="America/Toronto">America/Toronto</option>
        <option value="Africa/Abidjan">Africa/Abidjan</option>
        <option value="Africa/Casablanca">Africa/Casablanca</option>
        <option value="Africa/Tunis">Africa/Tunis</option>
      </select>
      <button class="reset" id="reset-${index}">Reset clock</button>
    `;

    //Add the watch element to the container
    watchesContainer.appendChild(watchElement);

    //div element for the buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    buttonsDiv.innerHTML = `
      <button class="watch-button mode" id="mode-${index}">M</button>
      <button class="watch-button increase" id="increase-${index}">+</button>
      <button class="watch-button light" id="light-${index}">L</button>
    `;
    watchesContainer.appendChild(buttonsDiv);

    //Get elements
    const hoursElement = document.getElementById('hours-'+ index);
    const minutesElement = document.getElementById('minutes-'+ index);
    const secondsElement = document.getElementById('seconds-'+ index);
    const formatElement = document.getElementById('AM-PM-'+ index);
    const selectElement = document.getElementById('timezone-select-'+ index) as HTMLSelectElement;
    let selectedValue = 'Europe/Paris';

    //Counter for added hours and minutes
    let addedHours:number = 0;
    let addedMinutes:number = 0;

    function updateTime() {
    
        // Get the current time of timezone
        let now = new Date(new Date().toLocaleString('en-US', { timeZone: selectedValue }));

        //Update time with addedHours and addedMinutes
        let newTime = new Date(now.getTime() + (addedHours * 3600000) + (addedMinutes * 60000));
        now = newTime;

        //Set the time of watch
        watch.setTime(now);

        //Configure the display when on AM-PM format
        let hours=now.getHours();
        if (watch.getFormat() === TimeFormat.AM_PM) {
            if ( hours > 12 ) {
                hours = hours - 12;
                formatElement.innerHTML = "PM";
            } else {
                formatElement.innerHTML = "AM"
            }
        } else {
            formatElement.innerHTML = "";
        }

        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        hoursElement.innerText = hours.toString().padStart(2, '0');
        minutesElement.innerText = minutes;
        secondsElement.innerText = seconds;     
    }

    //Update time each second
    setInterval(updateTime, 1000);

    //Update time when changing timezone
    selectElement.addEventListener('change', function() {
        selectedValue = selectElement.value;
        watch.setMode(0);
        addedHours = 0;
        addedMinutes = 0;
    });

    document.getElementById('mode-'+index).addEventListener("click", function() {
        watch.changeMode();
    });

    document.getElementById('increase-'+index).addEventListener("click", function() {
        watch.increaseTime();
        if (watch.getMode() == 1) {
            addedHours++;
        } else if (watch.getMode() == 2) {
            addedMinutes++;
        } 
        updateTime();
    });

    document.getElementById('light-'+index).addEventListener("click", function() {
        watch.lightOn();
        const timeElement = document.getElementById("time-"+index);
        timeElement.classList.toggle('dark');
        watchElement.classList.toggle('dark');
        watchesContainer.classList.toggle('dark');
    });

    document.getElementById('reset-'+index).addEventListener("click", function() {
        addedHours = 0;
        addedMinutes = 0;
    });

    document.getElementById("format").addEventListener("click", function() {
        if (watch.getFormat() === TimeFormat.TWENTY_FOUR_HOUR) {
            watch.setFormat(TimeFormat.AM_PM);
        } else {
            watch.setFormat(TimeFormat.TWENTY_FOUR_HOUR);
        }
    });
})