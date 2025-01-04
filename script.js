const root_path="root@www.qinpeng.cc"

// 添加有趣的文案数组
const funnyMessages = [
    `🔓 KERNEL PANIC: SYSTEM OVERLOAD!
...
...
Just messin' with ya! 
Your regularly scheduled personality is loading...
[====================] 100% Complete

STATUS: Slightly caffeinated and ready to roll
MOOD: Chaotic Good
BUGS: Many, but we call them "features"`,

    `🎮 PLAYER 1 ENTERED THE GAME
Loading save point: caffeine_overdose.exe
Achievement Unlocked: "Found the Secret Terminal!"
Difficulty Level: Expert Procrastinator
Hint: Commands may or may not work (mostly may not)
Press Any Key to... oh wait, all keys do nothing 😅`,

    `🍜 Welcome to Terminal Café!
Today's Special:
   - Fresh brewed code
   - Bug-free promises (sold separately)
   - Unlimited syntax errors

Note: We are not responsible for any 
sudden urges to become a programmer`,

    `🛸 INITIATING FIRST CONTACT...
Species: Human (presumably)
Year: 2024 (your timeline)
Mission: Unknown
Warning: This terminal may contain 
traces of artificial intelligence 
and questionable humor`,

    `🎬 In a world...
Where terminals are boring...
One website dared to be different...
TERMINAL QUEST: THE AWAKENING
Starring: You
Special Effects: None
Budget: 0
Rating: PFFT (Pretty Fun For Terminal)`
];

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal-content');
    const input = document.getElementById('terminal-input');
    const outputLines = document.querySelector('.output-lines');

    function updatePrompt() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const prompt = document.querySelector('.prompt');
        prompt.innerHTML = `<span class="prompt-path">${root_path}</span> <span class="prompt-time">${time}</span> ❯ `;
    }

    function updateLastPrompt() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const prompts = document.querySelectorAll('.prompt');
        const lastPrompt = prompts[prompts.length - 1];
        if (lastPrompt) {
            lastPrompt.innerHTML = `<span class="prompt-path">${root_path}</span> <span class="prompt-time">${time}</span> ❯ `;
        }
    }

    setInterval(updateLastPrompt, 1000);
    updatePrompt();

    // 添加自动滚动函数
    function scrollToBottom() {
        terminal.scrollTop = terminal.scrollHeight;
        // 确保输入框在视图中
        input.scrollIntoView({ behavior: 'smooth' });
    }

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            
            // 无论是否有输入，都显示命令行
            const commandLine = document.createElement('div');
            const now = new Date();
            const time = now.toLocaleTimeString();
            commandLine.innerHTML = `<span class="prompt"><span class="prompt-path">${root_path}</span> <span class="prompt-time">${time}</span> ❯ </span>${command}`;
            outputLines.appendChild(commandLine);

            // 只在有输入内容时显示随机消息
            if (command) {
                const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
                const messageLine = document.createElement('div');
                messageLine.style.color = '#2aa198';
                messageLine.style.whiteSpace = 'pre-line';
                messageLine.textContent = randomMessage;
                outputLines.appendChild(messageLine);
            }

            input.value = '';
            scrollToBottom();
        }
    });

    // 监听内容变化，确保始终滚动到底部
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(outputLines, {
        childList: true,
        subtree: true
    });
});
