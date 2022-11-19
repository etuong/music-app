

const Mobile = () => {
  return (
    <section>
      <main class="player">
        <div class="header">
          <a href="#" class="button">
            <i class="fas fa-bars" aria-hidden="true"></i>
            <span class="sr-only">menu bar</span>
          </a>
          <p>Now Playing</p>
          <a href="#" class="button">
            <i class="fas fa-search" aria-hidden="true"></i>
            <span class="sr-only">Search</span>
          </a>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuBNBcOFFjXIkz4EkF_AyxysJil8Vldwb-Q&usqp=CAU"
          alt="album art"
          class="art"
        />
        <div class="info">
          <h1>The Beatles</h1>
          <p>Elanor Rigby</p>
        </div>
        <div class="prog">
          <div class="prog-time">
            <p class="left">0:00</p>
            <p class="right">2:06</p>
          </div>
          <div class="prog-bar">
            <div class="prog-bar-inner"></div>
          </div>
        </div>
        <ul class="buttons">
          <a href="#" class="button button-sm">
            <i class="fas fa-random fa-sm" aria-hidden="true"></i>
            <span class="sr-only">Shuffle</span>
          </a>
          <a href="#" class="button button-md">
            <i class="fas fa-step-backward" aria-hidden="true"></i>
            <span class="sr-only">Previous Music</span>
          </a>
          <a href="#" class="button button-lg">
            <i class="fas fa-pause fa-lg" aria-hidden="true"></i>
            <span class="sr-only">Pause</span>
          </a>
          <a href="#" class="button button-md">
            <i class="fas fa-step-forward"></i>
            <span class="sr-only">Next Music</span>
          </a>
          <a href="#" class="button button-sm">
            <i class="fas fa-circle-notch fa-sm" aria-hidden="true"></i>
            <span class="sr-only">Repeat Song</span>
          </a>
        </ul>
        <div class="bar"></div>
      </main>
    </section>
  );
};

export default Mobile;
