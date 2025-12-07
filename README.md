# 🎵 开始懂了 - 孙燕姿 - VS Code Style

[English](#english) | [中文](#chinese)

---

<a name="chinese"></a>

## 中文说明

一个基于 VS Code 界面风格的交互式歌词可视化网页应用，展示孙燕姿的《开始懂了》。

通过实时同步的 LRC 歌词显示和诗意的视觉效果，创造一个独特的视听体验。

### ✨ 核心特性

#### 🎨 VS Code 界面风格
- **完整的 VS Code Dark+ 主题**：经典的暗色主题，支持亮色/暗色切换
- **活动栏**：资源管理器、搜索、源代码管理、运行和调试、扩展等图标
- **侧边栏**：文件树视图，显示项目结构
- **编辑器区域**：带行号的歌词显示区域
- **集成终端**：播放信息和状态输出
- **状态栏**：显示分支、语言、编码、播放状态等信息
- **标签页系统**：LRC 文件标签页界面
- **面包屑导航**：文件路径导航

#### 🎵 歌词同步显示
- **LRC 格式解析**：完整支持 LRC 时间轴格式
- **逐行显示**：歌词随着音乐播放逐行出现
- **实时高亮**：当前播放的歌词行高亮显示
- **流畅动画**：淡入效果和滚动动画
- **歌曲信息**：孙燕姿《开始懂了》(Beginning To Understand)

#### ✨ 增强的视觉效果
- **中文字符代码雨**：使用中文字符（梦、爱、心、情、懂等）、英文字母和二进制数字
- **粒子动画背景**：启动页面的动态粒子效果
- **霓虹灯发光效果**：关键文字和元素的发光动画
- **音频波浪可视化**：实时音频频谱可视化
- **动态渐变背景**：启动页面的渐变色彩动画

#### 🎮 交互控制
- **键盘快捷键**：
  - `Space` - 暂停/继续播放
  - `Esc` - 停止播放
  - `M` - 静音/取消静音
  - `F11` - 全屏模式
  - `←` / `→` - 快退/快进 5秒
- **可拖拽进度条**：精确控制播放进度
- **音量控制**：可调节的音量滑块
- **全屏模式**：沉浸式观看体验
- **主题切换**：一键切换亮色/暗色主题

#### 📱 响应式设计
- **桌面设备**：完整的 VS Code 界面体验
- **平板设备**：自适应布局
- **移动设备**：优化的移动端界面
- **触摸屏支持**：触摸友好的控制

### 🚀 使用方法

#### 在线使用（GitHub Pages）
直接访问：[https://zichen0116.github.io/Web-Music/](https://zichen0116.github.io/Web-Music/)

#### 本地使用
1. 克隆或下载此仓库
```bash
git clone https://github.com/zichen0116/Web-Music.git
cd Web-Music
```

2. 添加您的音频文件到 `assets/audio/` 目录：
   - 将音频文件命名为 `music.mp3`
   - 或修改 `index.html` 中的音频路径

3. 用浏览器打开 `index.html` 或启动本地服务器：
```bash
# Python 3
python3 -m http.server 8080

# 或 Python 2
python -m SimpleHTTPServer 8080

# 然后访问 http://localhost:8080
```

4. 点击启动页面或按空格键开始体验

#### 音频文件配置
由于版权原因，本项目不包含音频文件。请按以下步骤添加：

1. 将您的音频文件（`.mp3`）放入 `assets/audio/` 目录
2. 将文件命名为 `music.mp3`
3. 或者，在 `index.html` 中修改音频路径：

```html
<audio id="audio" preload="auto">
    <source src="assets/audio/your_song.mp3" type="audio/mpeg">
</audio>
```

**推荐设置**：
- 时长：3-4 分钟
- 格式：MP3 (320 kbps)
- 大小：不超过 50MB

#### 歌词文件配置
项目已预置《开始懂了》的 LRC 歌词文件。如需更换：

1. 编辑 `assets/audio/lyrics.lrc` 文件
2. 使用标准 LRC 格式：
```
[ti:歌曲名]
[ar:歌手名]
[00:00.00]第一行歌词
[00:05.00]第二行歌词
```

### 📁 项目结构

```
/
├── index.html              # 主 HTML 页面
├── css/
│   └── style.css          # 完整的样式文件（VS Code 主题 + 动画效果）
├── js/
│   ├── main.js            # 主要 JavaScript 逻辑
│   ├── lrc-parser.js      # LRC 歌词解析器
│   └── matrix-rain.js     # Matrix 代码雨效果
├── assets/
│   └── audio/
│       ├── lyrics.lrc     # 歌词文件（LRC 格式）
│       ├── music.mp3      # 音频文件（用户自行添加）
│       └── README.md      # 音频文件说明
└── README.md              # 项目文档（本文件）
```

### ⌨️ 快捷键参考

| 快捷键 | 功能 |
|--------|------|
| `Space` | 暂停/继续播放 |
| `Esc` | 停止播放 |
| `F11` | 进入/退出全屏模式 |
| `M` | 静音/取消静音 |
| `←` | 快退 5 秒 |
| `→` | 快进 5 秒 |

### 🎨 歌词文件格式

LRC 格式示例：
```lrc
[ti:开始懂了]
[ar:孙燕姿]
[al:我要的幸福]
[00:00.00]开始懂了 - 孙燕姿
[00:04.00]词：姚若龙
[00:08.00]曲：李偲菘
[00:21.00]我竟然没有调头
[00:25.00]最残忍那一刻
```

### 🛠️ 技术栈

- **纯 HTML/CSS/JavaScript**：无需构建工具或框架
- **Fira Code 字体**：编程专用等宽字体
- **Web Audio API**：音频可视化和控制
- **Canvas API**：粒子效果和 Matrix 代码雨
- **LRC Parser**：自定义 LRC 格式解析器
- **CSS Grid/Flexbox**：响应式布局
- **CSS 动画**：GPU 加速的流畅动画

### 🌐 浏览器兼容性

支持所有现代浏览器：
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 🌟 GitHub Pages 部署

1. Fork 此仓库到您的 GitHub 账户
2. 进入仓库设置 (Settings)
3. 找到 "Pages" 选项
4. 在 "Source" 下选择 `main` 分支
5. 点击保存
6. 等待几分钟，访问 `https://your-username.github.io/Web-Music/`

### 🎯 灵感来源

- 原始项目：[zmrlft/world-execute-me-idea](https://github.com/zmrlft/world-execute-me-idea)
- 歌曲：孙燕姿 - 《开始懂了》(Beginning To Understand)
- 界面灵感：Visual Studio Code

### 📝 自定义

您可以轻松自定义此项目：

1. **更换歌曲**：替换 `assets/audio/music.mp3` 文件
2. **更换歌词**：编辑 `assets/audio/lyrics.lrc` 文件
3. **调整主题颜色**：在 `css/style.css` 中修改 CSS 变量
4. **修改代码雨字符**：在 `js/matrix-rain.js` 中修改字符集
5. **添加新效果**：在 `js/main.js` 中添加新的动画函数

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📄 开源协议

MIT License - 详见 LICENSE 文件

---

<a name="english"></a>

## English Documentation

An interactive lyrics visualization web application with VS Code interface style, featuring "Beginning To Understand" by Stefanie Sun (孙燕姿).

Creates a unique audio-visual experience through real-time LRC lyrics synchronization and poetic visual effects.

### ✨ Core Features

#### 🎨 VS Code Interface Style
- **Complete VS Code Dark+ Theme**: Classic dark theme with light/dark toggle
- **Activity Bar**: Explorer, search, source control, debug, extensions icons
- **Sidebar**: File tree view showing project structure
- **Editor Area**: Lyrics display area with line numbers
- **Integrated Terminal**: Playback information and status output
- **Status Bar**: Shows branch, language, encoding, playback status, etc.
- **Tab System**: LRC file tab interface
- **Breadcrumb Navigation**: File path navigation

#### 🎵 Synchronized Lyrics Display
- **LRC Format Parser**: Full support for LRC timeline format
- **Line-by-Line Display**: Lyrics appear line by line with music
- **Real-time Highlight**: Current playing lyric line is highlighted
- **Smooth Animation**: Fade-in effects and scroll animations
- **Song Info**: "Beginning To Understand" by Stefanie Sun

#### ✨ Enhanced Visual Effects
- **Chinese Character Code Rain**: Uses Chinese characters (梦、爱、心、情、懂, etc.), English letters, and binary digits
- **Particle Animation Background**: Dynamic particle effects on launch screen
- **Neon Glow Effect**: Glowing animation for key text and elements
- **Audio Wave Visualization**: Real-time audio spectrum visualization
- **Dynamic Gradient Background**: Gradient color animation on launch screen

#### 🎮 Interactive Controls
- **Keyboard Shortcuts**:
  - `Space` - Play/Pause
  - `Esc` - Stop playback
  - `M` - Mute/Unmute
  - `F11` - Fullscreen mode
  - `←` / `→` - Rewind/Forward 5 seconds
- **Draggable Progress Bar**: Precise playback control
- **Volume Control**: Adjustable volume slider
- **Fullscreen Mode**: Immersive viewing experience
- **Theme Toggle**: One-click light/dark theme switch

#### 📱 Responsive Design
- **Desktop**: Full VS Code interface experience
- **Tablet**: Adaptive layout
- **Mobile**: Optimized mobile interface
- **Touch Screen Support**: Touch-friendly controls

### 🚀 Usage

#### Online Usage (GitHub Pages)
Direct access: [https://zichen0116.github.io/Web-Music/](https://zichen0116.github.io/Web-Music/)

#### Local Usage
1. Clone or download this repository
```bash
git clone https://github.com/zichen0116/Web-Music.git
cd Web-Music
```

2. Add your audio file to `assets/audio/` directory:
   - Name it `music.mp3`
   - Or modify audio path in `index.html`

3. Open `index.html` in a browser or start a local server:
```bash
# Python 3
python3 -m http.server 8080

# Or Python 2
python -m SimpleHTTPServer 8080

# Then visit http://localhost:8080
```

4. Click the launch screen or press Space to start

#### Audio File Configuration
Due to copyright reasons, this project does not include audio files. Follow these steps:

1. Place your audio file (`.mp3`) in `assets/audio/` directory
2. Name it `music.mp3`
3. Or modify the audio path in `index.html`:

```html
<audio id="audio" preload="auto">
    <source src="assets/audio/your_song.mp3" type="audio/mpeg">
</audio>
```

**Recommended Settings**:
- Duration: 3-4 minutes
- Format: MP3 (320 kbps)
- Size: Under 50MB

#### Lyrics File Configuration
Project includes pre-configured LRC lyrics for "Beginning To Understand". To replace:

1. Edit `assets/audio/lyrics.lrc` file
2. Use standard LRC format:
```
[ti:Song Title]
[ar:Artist Name]
[00:00.00]First line of lyrics
[00:05.00]Second line of lyrics
```

### 📁 Project Structure

```
/
├── index.html              # Main HTML page
├── css/
│   └── style.css          # Complete stylesheet (VS Code theme + animations)
├── js/
│   ├── main.js            # Main JavaScript logic
│   ├── lrc-parser.js      # LRC lyrics parser
│   └── matrix-rain.js     # Matrix code rain effect
├── assets/
│   └── audio/
│       ├── lyrics.lrc     # Lyrics file (LRC format)
│       ├── music.mp3      # Audio file (user provided)
│       └── README.md      # Audio file instructions
└── README.md              # Project documentation (this file)
```

### ⌨️ Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `Space` | Play/Pause |
| `Esc` | Stop playback |
| `F11` | Toggle fullscreen |
| `M` | Mute/Unmute |
| `←` | Rewind 5 seconds |
| `→` | Forward 5 seconds |

### 🎨 Lyrics File Format

LRC format example:
```lrc
[ti:Beginning To Understand]
[ar:Stefanie Sun]
[al:Desired Happiness]
[00:00.00]Beginning To Understand - Stefanie Sun
[00:04.00]Lyricist: Yao Ruo-long
[00:08.00]Composer: Li Si-song
[00:21.00]I actually didn't turn back
[00:25.00]At the most cruel moment
```

### 🛠️ Technology Stack

- **Pure HTML/CSS/JavaScript**: No build tools or frameworks required
- **Fira Code Font**: Programming-specific monospace font
- **Web Audio API**: Audio visualization and control
- **Canvas API**: Particle effects and Matrix code rain
- **LRC Parser**: Custom LRC format parser
- **CSS Grid/Flexbox**: Responsive layout
- **CSS Animations**: GPU-accelerated smooth animations

### 🌐 Browser Compatibility

Supports all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 🌟 GitHub Pages Deployment

1. Fork this repository to your GitHub account
2. Go to repository Settings
3. Find "Pages" option
4. Under "Source", select `main` branch
5. Click Save
6. Wait a few minutes and visit `https://your-username.github.io/Web-Music/`

### 🎯 Inspiration

- Original project: [zmrlft/world-execute-me-idea](https://github.com/zmrlft/world-execute-me-idea)
- Song: "Beginning To Understand" by Stefanie Sun (孙燕姿)
- Interface inspiration: Visual Studio Code

### 📝 Customization

You can easily customize this project:

1. **Replace Song**: Replace `assets/audio/music.mp3` file
2. **Replace Lyrics**: Edit `assets/audio/lyrics.lrc` file
3. **Adjust Theme Colors**: Modify CSS variables in `css/style.css`
4. **Modify Code Rain Characters**: Change character set in `js/matrix-rain.js`
5. **Add New Effects**: Add new animation functions in `js/main.js`

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📄 License

MIT License - See LICENSE file for details