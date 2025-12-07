# 🎵 World Execute Me - VS Code Style

[English](#english) | [中文](#chinese)

---

<a name="chinese"></a>

## 中文说明

一个基于 VS Code 界面风格的交互式音乐可视化网页应用，灵感来自 [world-execute-me-idea](https://github.com/zmrlft/world-execute-me-idea)。

通过 Python 代码的打字机动画和诗意的编程叙事，创造一个独特的视听体验。

### ✨ 核心特性

#### 🎨 VS Code 界面风格
- **完整的 VS Code Dark+ 主题**：经典的暗色主题，支持亮色/暗色切换
- **活动栏**：文件浏览器、搜索、源代码管理、扩展等图标
- **侧边栏**：文件树视图，显示项目结构
- **代码编辑器**：带行号、语法高亮和迷你地图
- **集成终端**：Python REPL 风格的终端输出
- **状态栏**：显示分支、语言、编码、播放状态等信息
- **标签页系统**：多文件标签页界面
- **面包屑导航**：文件路径导航

#### 🐍 Python 代码主题
- **语法高亮**：完整的 Python 语法高亮支持
  - 关键字 (`def`, `class`, `import`, `return` 等)
  - 字符串和注释
  - 内置函数 (`print`, `range`, `len` 等)
  - 装饰器和类名
  - 数字和运算符
- **打字机效果**：代码逐字符出现，模拟真实编码场景
- **诗意的代码故事**：用 Python 代码讲述关于梦想和追求的故事
- **终端输出动画**：与代码同步的 Python 程序输出

#### ✨ 增强的视觉效果
- **打字机效果** + **光标闪烁**：真实的代码输入体验
- **粒子动画背景**：启动页面的动态粒子效果
- **霓虹灯发光效果**：关键文字和元素的发光动画
- **音频波浪可视化**：实时音频频谱可视化
- **Matrix 代码雨效果**：经典的黑客帝国风格代码雨
- **动态渐变背景**：启动页面的渐变色彩动画
- **心跳脉冲动画**：特定元素的脉冲效果

#### 🎮 增强的交互效果
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
- **代码行高亮**：当前输入行的高亮显示
- **鼠标交互**：按钮悬停动画和过渡效果

#### 📱 响应式设计
- **桌面设备**：完整的 VS Code 界面体验
- **平板设备**：自适应布局
- **移动设备**：优化的移动端界面
- **触摸屏支持**：触摸友好的控制

### 🚀 使用方法

#### 在线使用
1. 克隆或下载此仓库
2. 添加您的音频文件到 `assets/audio/` 目录（见下方说明）
3. 用浏览器打开 `index.html`
4. 点击启动页面或按空格键开始体验

#### 音频文件配置
由于版权原因，本项目不包含音频文件。请按以下步骤添加：

1. 将您的音频文件（`.wav`、`.mp3` 或 `.ogg`）放入 `assets/audio/` 目录
2. 将文件命名为 `world_execute_me.wav` 或 `world_execute_me.mp3`
3. 或者，在 `index.html` 中修改音频路径：

```html
<audio id="audio" preload="auto">
    <source src="assets/audio/your_song.wav" type="audio/wav">
    <source src="assets/audio/your_song.mp3" type="audio/mpeg">
</audio>
```

**推荐设置**：
- 时长：3-4 分钟
- 格式：MP3 (320 kbps) 或 WAV (16-bit, 44.1 kHz)
- 大小：不超过 50MB

### 📁 项目结构

```
/
├── index.html              # 主 HTML 页面
├── css/
│   └── style.css          # 完整的样式文件（VS Code 主题 + 动画效果）
├── js/
│   └── main.js            # JavaScript 逻辑（动画、音频控制、交互）
├── assets/
│   └── audio/
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

### 🎨 代码故事内容

代码讲述了一个关于程序员追逐梦想的故事：

```python
# 一个梦想家的故事
class 梦想家:
    def __init__(self, name):
        self.name = name
        self.dreams = []
    
    def 追逐(self, dream):
        print(f"正在追逐: {dream}")
        self.dreams.append(dream)
        return "永不放弃"

def main():
    我 = 梦想家("程序员")
    我.追逐("创造美好的代码")
    我.追逐("用技术改变世界")
    我.追逐("让生活充满诗意")
```

### 🛠️ 技术栈

- **纯 HTML/CSS/JavaScript**：无需构建工具或框架
- **Fira Code 字体**：编程专用等宽字体
- **Web Audio API**：音频可视化和控制
- **Canvas API**：粒子效果和 Matrix 代码雨
- **CSS Grid/Flexbox**：响应式布局
- **CSS 动画**：GPU 加速的流畅动画

### 🌐 浏览器兼容性

支持所有现代浏览器：
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 🎯 灵感来源

- 原始项目：[zmrlft/world-execute-me-idea](https://github.com/zmrlft/world-execute-me-idea)
- 歌曲灵感：momocashew 的 "world.execute(me);"
- 界面灵感：Visual Studio Code

### 📝 自定义

您可以轻松自定义此项目：

1. **修改代码内容**：编辑 `js/main.js` 中的 `pythonCode` 变量
2. **调整终端输出**：修改 `terminalOutputs` 数组
3. **更改主题颜色**：在 `css/style.css` 中修改 CSS 变量
4. **添加新效果**：在 `js/main.js` 中添加新的动画函数

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📄 开源协议

MIT License - 详见 LICENSE 文件

---

<a name="english"></a>

## English Documentation

An interactive music visualization web application with VS Code interface style, inspired by [world-execute-me-idea](https://github.com/zmrlft/world-execute-me-idea).

Creates a unique audio-visual experience through Python code typing animation and poetic programming narrative.

### ✨ Core Features

#### 🎨 VS Code Interface Style
- **Complete VS Code Dark+ Theme**: Classic dark theme with light/dark toggle
- **Activity Bar**: File explorer, search, source control, extensions icons
- **Sidebar**: File tree view showing project structure
- **Code Editor**: With line numbers, syntax highlighting, and minimap
- **Integrated Terminal**: Python REPL style terminal output
- **Status Bar**: Shows branch, language, encoding, playback status, etc.
- **Tab System**: Multi-file tab interface
- **Breadcrumb Navigation**: File path navigation

#### 🐍 Python Code Theme
- **Syntax Highlighting**: Complete Python syntax highlighting support
  - Keywords (`def`, `class`, `import`, `return`, etc.)
  - Strings and comments
  - Built-in functions (`print`, `range`, `len`, etc.)
  - Decorators and class names
  - Numbers and operators
- **Typewriter Effect**: Code appears character by character, simulating real coding
- **Poetic Code Story**: Tells a story about dreams and pursuit through Python code
- **Terminal Output Animation**: Python program output synchronized with code

#### ✨ Enhanced Visual Effects
- **Typewriter Effect** + **Cursor Blink**: Authentic code input experience
- **Particle Animation Background**: Dynamic particle effects on launch screen
- **Neon Glow Effect**: Glowing animation for key text and elements
- **Audio Wave Visualization**: Real-time audio spectrum visualization
- **Matrix Code Rain Effect**: Classic Matrix-style code rain
- **Dynamic Gradient Background**: Gradient color animation on launch screen
- **Heartbeat Pulse Animation**: Pulse effects for specific elements

#### 🎮 Enhanced Interactions
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
- **Code Line Highlight**: Highlighting of current typing line
- **Mouse Interactions**: Button hover animations and transitions

#### 📱 Responsive Design
- **Desktop**: Full VS Code interface experience
- **Tablet**: Adaptive layout
- **Mobile**: Optimized mobile interface
- **Touch Screen Support**: Touch-friendly controls

### 🚀 Usage

#### Online Usage
1. Clone or download this repository
2. Add your audio file to `assets/audio/` directory (see instructions below)
3. Open `index.html` in a browser
4. Click the launch screen or press Space to start

#### Audio File Configuration
Due to copyright reasons, this project does not include audio files. Follow these steps to add your own:

1. Place your audio file (`.wav`, `.mp3`, or `.ogg`) in `assets/audio/` directory
2. Name it `world_execute_me.wav` or `world_execute_me.mp3`
3. Or modify the audio path in `index.html`:

```html
<audio id="audio" preload="auto">
    <source src="assets/audio/your_song.wav" type="audio/wav">
    <source src="assets/audio/your_song.mp3" type="audio/mpeg">
</audio>
```

**Recommended Settings**:
- Duration: 3-4 minutes
- Format: MP3 (320 kbps) or WAV (16-bit, 44.1 kHz)
- Size: Under 50MB

### 📁 Project Structure

```
/
├── index.html              # Main HTML page
├── css/
│   └── style.css          # Complete stylesheet (VS Code theme + animations)
├── js/
│   └── main.js            # JavaScript logic (animations, audio control, interactions)
├── assets/
│   └── audio/
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

### 🎨 Code Story Content

The code tells a story about a programmer chasing dreams:

```python
# A dreamer's story
class 梦想家 (Dreamer):
    def __init__(self, name):
        self.name = name
        self.dreams = []
    
    def 追逐 (chase, dream):
        print(f"Chasing: {dream}")
        self.dreams.append(dream)
        return "Never give up"

def main():
    我 (me) = 梦想家("Programmer")
    我.追逐("Create beautiful code")
    我.追逐("Change the world with technology")
    我.追逐("Fill life with poetry")
```

### 🛠️ Technology Stack

- **Pure HTML/CSS/JavaScript**: No build tools or frameworks required
- **Fira Code Font**: Programming-specific monospace font
- **Web Audio API**: Audio visualization and control
- **Canvas API**: Particle effects and Matrix code rain
- **CSS Grid/Flexbox**: Responsive layout
- **CSS Animations**: GPU-accelerated smooth animations

### 🌐 Browser Compatibility

Supports all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 🎯 Inspiration

- Original project: [zmrlft/world-execute-me-idea](https://github.com/zmrlft/world-execute-me-idea)
- Song inspiration: momocashew's "world.execute(me);"
- Interface inspiration: Visual Studio Code

### 📝 Customization

You can easily customize this project:

1. **Modify code content**: Edit the `pythonCode` variable in `js/main.js`
2. **Adjust terminal output**: Modify the `terminalOutputs` array
3. **Change theme colors**: Modify CSS variables in `css/style.css`
4. **Add new effects**: Add new animation functions in `js/main.js`

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📄 License

MIT License - See LICENSE file for details