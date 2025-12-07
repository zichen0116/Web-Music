# Audio Files

## 音频文件说明 / Audio File Instructions

由于版权原因，本项目不包含音频文件。请将您自己的音频文件放入此目录。

Due to copyright reasons, this project does not include audio files. Please place your own audio files in this directory.

### 支持的格式 / Supported Formats

- WAV (`.wav`)
- MP3 (`.mp3`)
- OGG (`.ogg`)

### 文件命名 / File Naming

请将您的音频文件命名为 `world_execute_me.wav` 或 `world_execute_me.mp3`，或者在 `js/main.js` 中修改音频文件路径。

Please name your audio file as `world_execute_me.wav` or `world_execute_me.mp3`, or modify the audio file path in `js/main.js`.

### 推荐设置 / Recommended Settings

- **时长 / Duration**: 3-4 分钟 (minutes)
- **比特率 / Bitrate**: 320 kbps (MP3) 或 16-bit (WAV)
- **采样率 / Sample Rate**: 44.1 kHz

### 如何更换音频 / How to Replace Audio

1. 将您的音频文件复制到 `assets/audio/` 目录
2. 确保文件名匹配或更新 `index.html` 中的 `<audio>` 标签
3. 刷新浏览器即可播放您的音乐

1. Copy your audio file to the `assets/audio/` directory
2. Make sure the filename matches or update the `<audio>` tag in `index.html`
3. Refresh the browser to play your music

### 示例配置 / Example Configuration

在 `index.html` 中：

```html
<audio id="audio" preload="auto">
    <source src="assets/audio/your_song.wav" type="audio/wav">
    <source src="assets/audio/your_song.mp3" type="audio/mpeg">
</audio>
```

### 注意事项 / Notes

- 确保音频文件不超过 50MB 以获得最佳性能
- 建议使用压缩格式 (MP3/OGG) 以减少加载时间
- 某些浏览器可能需要用户交互才能自动播放音频

- Keep audio files under 50MB for best performance
- Use compressed formats (MP3/OGG) to reduce loading time
- Some browsers may require user interaction before auto-playing audio
