import { app } from "../../../scripts/app.js";
import { ComfyWidgets } from "../../../scripts/widgets.js";

const HEZL_PROMPT_CSS = `
/* 全局设定：暗色风格 */
.hezl-prompt-container {
    display: flex;
    flex-direction: column;
    height: 600px;
    background: #1c1c1e; /* Dark Mode 底色 */
    border-radius: 12px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; /* 系统级抗锯齿字体 */
    color: #e5e5ea;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border: 1px solid #000;
}

/* 精致的系统级滚动条 */
.hezl-prompt-container ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
.hezl-prompt-container ::-webkit-scrollbar-track {
    background: transparent;
}
.hezl-prompt-container ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: padding-box;
}
.hezl-prompt-container ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
}

/* 顶部搜索栏与控制栏 */
.hezl-search-container {
    display: flex;
    gap: 8px;
    padding: 8px 10px;
    background: #252528;
    border-bottom: 1px solid #111;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    flex-shrink: 0;
    align-items: center;
}

/* 输入框与下拉框 - 焦点环风格 */
.hezl-search-input, .hezl-search-select, .hezl-form-input, .hezl-form-textarea {
    background: #151515;
    border: 1px solid #333;
    color: #dedede;
    padding: 5px 8px;
    border-radius: 6px;
    font-size: 12px;
    transition: all 0.2s ease;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
}

.hezl-search-input:focus, .hezl-search-select:focus, .hezl-form-input:focus, .hezl-form-textarea:focus {
    border-color: #0a84ff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.3), inset 0 1px 2px rgba(0,0,0,0.3);
}

.hezl-form-input{
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    font-size: 13px;
    box-sizing: border-box;
}

.hezl-form-textarea{
    width: 100%;
    min-height: 200px;
    padding: 8px;
    border-radius: 4px;
    font-size: 13px;
    resize: vertical;
    box-sizing: border-box;
}

.hezl-search-input {
    flex: 1;
    min-width: 0;
}

/* 质感按钮 (线性渐变 + 内发光边缘) */
.hezl-desc-btn {
    padding: 5px 12px;
    border: 1px solid #111;
    border-top: 1px solid #555; /* 顶部高光 */
    border-radius: 6px;
    background: linear-gradient(180deg, #444, #333);
    color: #eee;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}
    
.hezl-btn {
    padding: 5px 12px;
    // height: 50px;
    border: 1px solid #111;
    border-top: 1px solid #555; /* 顶部高光 */
    border-radius: 6px;
    background: linear-gradient(180deg, #26a75b, #20914f);
    color: #eee;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.hezl-btn:hover {
    background: linear-gradient(180deg, #2dc06a, #21a358);
    border-top: 1px solid #666;
}

.hezl-btn:active {
    background: #2a2a2a;
    border-top: 1px solid #111;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
    transform: translateY(1px);
}

/* 颜色变体按钮 */
.hezl-btn.success {
    background: linear-gradient(180deg, #26a75b, #20914f);
    border-top: 1px solid #58d68d;
    color: #fff;
}
.hezl-btn.success:hover { 
    background: linear-gradient(180deg, #2dc06a, #21a358);
}

.hezl-btn.danger {
    background: linear-gradient(180deg, #e74c3c, #c0392b);
    border-top: 1px solid #f1948a;
    color: #fff;
}
.hezl-btn.danger:hover { background: linear-gradient(180deg, #ee5242, #e74c3c); }

.hezl-btn.warning {
    background: linear-gradient(180deg, #f39c12, #d68910);
    border-top: 1px solid #f8c471;
    color: #fff;
}
.hezl-btn.warning:hover { background: linear-gradient(180deg, #f4a62a, #e67e22); }

.hezl-btn.small {
    padding: 3px 8px;
    font-size: 12px;
    border-radius: 4px;
}

.hezl-btn.cancel {
    padding: 5px 12px;
    // height: 50px;
    border: 1px solid #111;
    border-top: 1px solid #555; /* 顶部高光 */
    border-radius: 6px;
    background: linear-gradient(180deg, #858585, #616161);
    color: #eee;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

/* 分割面板区域 */
.hezl-prompt-top {
    display: flex;
    flex: 1;
    min-height: 0;
    background: #1e1e1e;
}

.hezl-prompt-sidebar {
    flex: 0 0 auto;
    width: 40%;
    min-width: 160px;
    background: #232326; /* 左侧边栏略微提亮 */
    display: flex;
    flex-direction: column;
}

.hezl-prompt-list {
    flex: 1;
    min-height: 0; 
    min-width: 200px;
    overflow-y: auto;
    padding: 12px;
    background: #1c1c1e;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 8px;
}

.hezl-prompt-bottom {
    flex: 0 0 200px;
    min-height: 140px;
    padding: 0;
    overflow-y: hidden;
    background: #252528;
    display: flex;
    flex-direction: column;
}

/* 优雅的分割线 (Hover时才显示提示) */
.hezl-splitter-vertical {
    width: 2px;
    cursor: col-resize;
    background: #000;
    position: relative;
    z-index: 10;
}
.hezl-splitter-vertical:hover, .hezl-splitter-vertical:active {
    background: #0a84ff;
    box-shadow: 0 0 4px #0a84ff;
}

.hezl-splitter-horizontal {
    height: 10px;
    cursor: row-resize;
    background: #000;
    position: relative;
    z-index: 10;
}
.hezl-splitter-horizontal:hover, .hezl-splitter-horizontal:active {
    background: #0a84ff;
    box-shadow: 0 0 4px #0a84ff;
}

/* 树形列表优化 */
.hezl-folder-tree {
    padding: 6px;
    flex: 1;
    min-height: 0; 
    overflow-y: auto; 
}

.hezl-folder-item {
    cursor: pointer;
    padding: 5px 8px;
    margin: 2px 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #c7c7cc;
    transition: all 0.15s ease;
    border: 1px solid transparent;
}

.hezl-folder-item:hover {
    background: rgba(255,255,255,0.05);
}

.hezl-folder-item.selected {
    background: #0a84ff;
    color: #fff;
    border: 1px solid #0060cc;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.2);
}

.hezl-folder-icon {
    margin-right: 6px;
    font-size: 12px;
    opacity: 0.8;
}

.hezl-folder-item.selected .hezl-folder-icon {
    opacity: 1;
}

.hezl-folder-name {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

/* 计数角标 */
.hezl-folder-count {
    background: #ff453a;
    color: white;
    border-radius: 12px;
    padding: 1px 6px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    min-width: 16px;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
.hezl-folder-count:hover {
    background: #d63026;
}

/* 词组胶囊 - 3D质感 */
.hezl-prompt-item-wrapper {
    display: inline-flex;
    align-items: stretch;
    background: linear-gradient(180deg, #3a3a3c, #2c2c2e);
    border-radius: 8px;
    margin: 0;
    border: 1px solid #111;
    border-top: 1px solid #4a4a4c;
    overflow: hidden;
    transition: all 0.15s ease;
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.hezl-prompt-item-wrapper:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.25);
    border-top-color: #5a5a5c;
}

.hezl-prompt-item-wrapper.selected {
    background: linear-gradient(180deg, #0a84ff, #0060cc);
    border-top: 1px solid #4eb4ff;
    border-color: #004088;
}

.hezl-prompt-item-wrapper.dragging {
    opacity: 0.5;
    transform: scale(0.95);
}

.hezl-prompt-item-wrapper.drag-over {
    border-color: #32d74b;
}

/* 拖拽插入提示线 (发光效果) */
.hezl-prompt-item-wrapper.insert-before {
    box-shadow: -3px 0 0 #32d74b, 0 0 8px rgba(50, 215, 75, 0.5);
}
.hezl-prompt-item-wrapper.insert-after {
    box-shadow: 3px 0 0 #32d74b, 0 0 8px rgba(50, 215, 75, 0.5);
}

.hezl-prompt-item-content {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 0 2px;
}

.hezl-prompt-title {
    font-weight: 500;
    font-size: 12px;
    color: #bdbdbd;
    padding: 5px 10px;
    flex-shrink: 0;
    white-space: nowrap;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.hezl-prompt-title.selected {
    color: #eeeeee;
}


.hezl-prompt-edit-btn {
    display: none;
}

.hezl-sidebar-actions {
    display: flex;
    gap: 2px;
    margin-left: auto;
}

/* 栏目标题 */
.hezl-section-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.5px;
    color: #8e8e93;
    padding: 6px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #002741;
    border-bottom: 1px solid #111;
    z-index: 2;
    flex-shrink: 0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    user-select: none;
}

.hezl-section-title.library {
    background: #1c1d1e;
}

/* 底部已选区域预览 */
.hezl-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 40px;
    overflow-y: auto;
    padding: 12px;
    background: #1e1e1e;
    align-content: flex-start;
    user-select: none;
}

.hezl-preview-item {
    background: linear-gradient(180deg, #3a3a3c, #2c2c2e);
    border-radius: 6px;
    border: 1px solid #111;
    border-top: 1px solid #4a4a4c;
    cursor: grab;
    display: flex;
    align-items: stretch;
    gap: 0;
    overflow: hidden;
    transition: all 0.15s ease;
    font-size: 12px;
    user-select: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    height: 24px;
}

.hezl-preview-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.hezl-preview-text {
    order: 1;
    padding: 0 8px;
    color: #fff;
    display: flex;
    align-items: center;
    font-weight: 500;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

/* 权重调节控制器 (类似分段选择器) */
.hezl-weight-control {
    display: flex;
    align-items: center;
    background: rgba(0,0,0,0.2);
    border-left: 1px solid #111;
    border-right: 1px solid #111;
    order: 2;
    padding: 0 2px;
}

.hezl-weight-btn {
    width: 16px;
    height: 18px;
    border: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
    border-radius: 3px;
}
.hezl-weight-btn:hover { background: rgba(255,255,255,0.15); }
.hezl-weight-btn:active { background: rgba(0,0,0,0.3); }

.hezl-weight-value {
    font-size: 12px;
    min-width: 26px;
    text-align: center;
    color: #64d2ff;
    font-family: monospace;
    font-weight: bold;
}

.hezl-remove-btn {
    width: 24px;
    border: none;
    background: rgba(255, 69, 58, 0.1);
    color: #ff453a;
    cursor: pointer;
    font-size: 12px;
    order: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
}
.hezl-remove-btn:hover {
    background: #ff453a;
    color: #fff;
}

/* 禁用状态 */
.hezl-preview-item.disabled {
    opacity: 0.4;
    filter: grayscale(100%);
}
.hezl-preview-item.disabled:hover { opacity: 0.6; }

/* 拖拽视觉提示 */
.hezl-preview-item.insert-before { box-shadow: -3px 0 0 #32d74b; }
.hezl-preview-item.insert-after { box-shadow: 3px 0 0 #32d74b; }

.hezl-preview-actions {
    display: flex;
    gap: 6px;
    padding: 6px 10px;
    background: #252528;
    border-bottom: 1px solid #111;
}

.hezl-modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.hezl-empty-state {
    text-align: center;
    padding: 30px;
    color: #666;
    font-size: 12px;
    user-select: none;
}

/* 最终输出代码框 */
.hezl-output-text {
    background: #000;
    border-top: 1px solid #333;
    padding: 6px 10px;
    margin: 0;
    font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 12px;
    color: #27ae60;
    flex:1;
    overflow-y: auto;
    word-break: break-all;
}

/* 底部状态栏 */
.hezl-footer {
    padding: 4px 10px;
    background: #111;
    color: #949494;
    font-size: 12px;
    letter-spacing: 0.5px;
    border-top: 1px solid #000;
    flex-shrink: 0;
}

/* CSV 注释面板 */
.hezl-csv-description {
    padding: 8px 12px;
    background: #252528;
    border-bottom: 1px solid #111;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    color: #aeaeb2;
}

/* ====== 高级玻璃态弹窗 (Glassmorphism Modal) ====== */
.hezl-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px); /* 毛玻璃背景 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.hezl-modal-content {
    background: #1e1e1e;
    border: 1px solid #333;
    border-radius: 12px;
    padding: 24px;
    width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
    animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
    from { transform: translateY(20px) scale(0.98); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
}

.hezl-modal-header {
    font-size: 18px;
    font-weight: bold;
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #333;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.hezl-form-group {
    margin-bottom: 16px;
}

.hezl-form-label {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    color: #8e8e93;
    font-weight: 500;
}

/* 树状折叠图标 */
.hezl-tree-toggle {
    display: inline-block;
    width: 14px;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    color: #8e8e93;
    transition: color 0.2s;
}
.hezl-tree-toggle:hover { color: #fff; }

.hezl-folder-children {
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hezl-folder-children.collapsed {
    max-height: 0 !important;
}

/* 右键菜单 */
.hezl-context-menu {
    position: fixed;
    background: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 5px 0;
    z-index: 10003;
    min-width: 140px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
}

.hezl-context-menu-item {
    padding: 6px 16px;
    cursor: pointer;
    font-size: 12px;
    color: #dedede;
    transition: background 0.1s;
}

.hezl-context-menu-item:hover {
    background: #0a84ff;
    color: #fff;
}

/* 悬浮大图预览面板 */
.hezl-hover-preview {
    position: fixed;
    z-index: 10002;
    background: rgba(28, 28, 30, 0.95);
    backdrop-filter: blur(8px);
    border: 1px solid #444;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.6);
    max-width: 320px;
}
.hezl-hover-preview-text {
    font-size: 12px;
    color: #e5e5ea;
    line-height: 1.4;
    word-break: break-word;
}
`;

class HezlPromptWidget {
    constructor(node, inputName, inputData, app) {
        this.node = node;
        this.app = app;
        this.selectedPrompts = [];
        this.promptWeights = {};
        this.promptDisabled = {};
        this.folderStructure = null;
        this.currentFolder = "";
        this.currentFolderType = "";
        this.promptsData = [];
        this.folderSelectedCounts = {};
        this.expandedFolders = new Set();
        this.hoverPreview = null;
        this.contextMenu = null;
        this.uiState = null; 
        
        this.injectStyles();
        this.createWidget();
        this.loadFolderStructure();
    }
    
    injectStyles() {
        if (!document.getElementById('hezl-prompt-styles')) {
            const style = document.createElement('style');
            style.id = 'hezl-prompt-styles';
            style.textContent = HEZL_PROMPT_CSS;
            document.head.appendChild(style);
        }
    }

    getUid(prompt) {
        return (prompt.folder || prompt.source || '') + '::' + prompt.title;
    }
    
    setupModalClose(modal) {
        let modalMouseDown = false;
        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal) modalMouseDown = true;
            else modalMouseDown = false;
        });
        modal.addEventListener('mouseup', (e) => {
            if (e.target === modal && modalMouseDown) {
                modal.remove();
            }
            modalMouseDown = false;
        });
    }

    saveStateToWidget() {
        if (this.node && this.node.widgets) {
            const origWidget = this.node.widgets.find(w => w.name === 'selected_prompts');
            if (origWidget) {
                origWidget.value = JSON.stringify({
                    prompts: this.selectedPrompts || [],
                    weights: this.promptWeights || {},
                    disabled: this.promptDisabled || {},
                    ui_state: {
                        expandedFolders: Array.from(this.expandedFolders || []),
                        currentFolder: this.currentFolder || '',
                        currentFolderType: this.currentFolderType || ''
                    }
                });
            }
        }
    }

    loadStateFromValue(value) {
        try {
            if (!value || typeof value !== 'string') return;
            const data = JSON.parse(value);
            
            this.selectedPrompts = data.prompts || [];
            this.promptWeights = {};
            this.promptDisabled = {};
            this.uiState = data.ui_state || null; 
            
            const migrateState = (sourceObj, targetObj) => {
                if (!sourceObj) return;
                for (let k in sourceObj) {
                    if (k.includes('::')) {
                        targetObj[k] = sourceObj[k];
                    } else {
                        const p = this.selectedPrompts.find(p => p.title === k);
                        if (p) {
                            targetObj[this.getUid(p)] = sourceObj[k];
                        } else {
                            targetObj[k] = sourceObj[k];
                        }
                    }
                }
            };
            
            migrateState(data.weights, this.promptWeights);
            migrateState(data.disabled, this.promptDisabled);
            
            this.syncSelectionState();
            
            if (this.folderStructure) {
                this.restoreUiState();
            }
        } catch (e) {
            console.warn("Hezl Prompt Manager restore state error:", e);
        }
    }

    createWidget() {
        this.container = document.createElement('div');
        this.container.className = 'hezl-prompt-container';
        
        this.container.innerHTML = `
            <div class="hezl-prompt-top" id="hezl-prompt-top">
                <div class="hezl-prompt-sidebar" id="hezl-prompt-sidebar">
                    <div class="hezl-search-container">
                        <input type="text" class="hezl-search-input" id="hezl-folder-search" placeholder="🔍 搜索文件...">
                    </div>
                    <div class="hezl-section-title library">
                        <span>LIBRARY / 目录</span>
                        <div class="hezl-sidebar-actions">
                            <button class="hezl-btn small" id="hezl-add-root-folder" title="在根目录csv文件夹下创建文件夹">+ 文件夹</button>
                            <button class="hezl-btn small" id="hezl-refresh" title="刷新">⟳</button>
                        </div>
                    </div>
                    <div class="hezl-folder-tree" id="hezl-folder-tree"></div>
                </div>
                <div class="hezl-splitter-vertical" id="hezl-splitter-vertical"></div>
                
                <div style="display: flex; flex-direction: column; flex: 1; min-width: 200px; min-height: 0;">
                    <div class="hezl-search-container" style="border-bottom: 1px solid #111; align-items: center;">
                        <select class="hezl-search-select" id="hezl-prompt-search-type">
                            <option value="title">按标题</option>
                            <option value="content">按内容</option>
                        </select>
                        <input type="text" class="hezl-search-input" id="hezl-prompt-search" placeholder="🔍 搜索词组 (支持模糊匹配)...">
                        <button class="hezl-btn success small" id="hezl-add-prompt-btn" style="display: none; flex-shrink: 0;">+ 添加词组</button>
                    </div>
                    
                    <div id="hezl-csv-description" class="hezl-csv-description" style="display: none;">
                        <span class="text"></span>
                        <button class="hezl-desc-btn small" id="hezl-edit-desc-btn" style="flex-shrink: 0;">编辑说明</button>
                    </div>

                    <div class="hezl-prompt-list" id="hezl-prompt-list">
                        <div style="text-align:center; padding: 40px; color:#666; font-size:12px; width:100%;">请在左侧选择一个 CSV 文件查看词组</div>
                    </div>
                </div>
            </div>
            <div class="hezl-splitter-horizontal" id="hezl-splitter-horizontal"></div>
            <div class="hezl-prompt-bottom" id="hezl-prompt-bottom">
                <div class="hezl-section-title">
                    <span>SELECTED PROMPTS / 已选词组预览 (可拖拽排序，点击调节权重，单击禁用/启用)</span>
                </div>
                <div class="hezl-preview-actions">
                    <button class="hezl-btn small danger" id="hezl-remove-all">移除全部</button>
                    <button class="hezl-btn small warning" id="hezl-disable-all">禁用全部</button>
                    <button class="hezl-btn small success" id="hezl-enable-all">启用全部</button>
                </div>
                <div class="hezl-preview-container" id="hezl-preview-container"></div>
                <div class="hezl-output-text" id="hezl-output-text"></div>
            </div>
            <div class="hezl-footer">数据目录: comfyui/user/default/promptmanager/csv</div>
        `;
        
        this.folderTree = this.container.querySelector('#hezl-folder-tree');
        this.promptList = this.container.querySelector('#hezl-prompt-list');
        this.previewContainer = this.container.querySelector('#hezl-preview-container');
        this.outputText = this.container.querySelector('#hezl-output-text');
        this.sidebar = this.container.querySelector('#hezl-prompt-sidebar');
        this.topPanel = this.container.querySelector('#hezl-prompt-top');
        this.bottomPanel = this.container.querySelector('#hezl-prompt-bottom');
        this.verticalSplitter = this.container.querySelector('#hezl-splitter-vertical');
        this.horizontalSplitter = this.container.querySelector('#hezl-splitter-horizontal');
        
        this.setupEventListeners();
        this.setupSearchListeners(); 
    }

    restoreUiState() {
        if (!this.uiState) return;
        
        if (this.uiState.expandedFolders) {
            this.expandedFolders = new Set(this.uiState.expandedFolders);
            this.renderFolderTree();
        }
        
        if (this.uiState.currentFolder) {
            this.selectFolder(this.uiState.currentFolder, this.uiState.currentFolderType);
        }
        
        this.uiState = null; 
    }
    
    setupSearchListeners() {
        const folderSearchInput = this.container.querySelector('#hezl-folder-search');
        if (folderSearchInput) {
            folderSearchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                this.filterFolderTree(term);
            });
        }

        let searchTimeout;
        const promptSearchInput = this.container.querySelector('#hezl-prompt-search');
        const promptSearchType = this.container.querySelector('#hezl-prompt-search-type');
        
        const applyPromptSearch = () => {
            const term = promptSearchInput.value.toLowerCase();
            const type = promptSearchType.value;
            this.filterPrompts(term, type);
        };

        if (promptSearchInput) {
            promptSearchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(applyPromptSearch, 200); 
            });
        }
        if (promptSearchType) {
            promptSearchType.addEventListener('change', applyPromptSearch);
        }
    }

    filterFolderTree(term) {
        if (!this.folderTree) return;
        const items = this.folderTree.querySelectorAll('.hezl-folder-item');
        const childrenContainers = this.folderTree.querySelectorAll('.hezl-folder-children');
        
        if (!term) {
            items.forEach(item => item.style.display = '');
            childrenContainers.forEach(child => {
                child.style.display = '';
                const parentPath = child.dataset.parent;
                if (!this.expandedFolders.has(parentPath)) {
                    child.classList.add('collapsed');
                } else {
                    child.classList.remove('collapsed');
                }
            });
            return;
        }

        items.forEach(item => item.style.display = 'none');
        childrenContainers.forEach(child => {
            child.classList.add('collapsed');
            child.style.display = 'none';
        });

        items.forEach(item => {
            const nameNode = item.querySelector('.hezl-folder-name');
            if (nameNode && nameNode.textContent.toLowerCase().includes(term)) {
                item.style.display = '';
                let currentContainer = item.closest('.hezl-folder-children');
                while (currentContainer) {
                    currentContainer.classList.remove('collapsed');
                    currentContainer.style.display = '';
                    const parentPath = currentContainer.dataset.parent;
                    const parentItem = this.folderTree.querySelector(`.hezl-folder-item[data-path="${parentPath}"]`);
                    if (parentItem) parentItem.style.display = '';
                    currentContainer = parentItem ? parentItem.closest('.hezl-folder-children') : null;
                }
            }
        });
    }

    filterPrompts(term, type) {
        const wrappers = this.promptList.querySelectorAll('.hezl-prompt-item-wrapper');
        if (!term) {
            wrappers.forEach(w => w.style.display = '');
            return;
        }
        wrappers.forEach(wrapper => {
            const index = wrapper.dataset.index;
            const prompt = this.promptsData[index];
            if (!prompt) return;
            
            let textToSearch = type === 'title' ? prompt.title : prompt.content;
            if (textToSearch.toLowerCase().includes(term)) {
                wrapper.style.display = '';
            } else {
                wrapper.style.display = 'none';
            }
        });
    }

    setupEventListeners() {
        this.setupSplitters();
        
        const refreshBtn = this.container.querySelector('#hezl-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadFolderStructure();
            });
        }
        
        const addRootBtn = this.container.querySelector('#hezl-add-root-folder');
        if (addRootBtn) {
            addRootBtn.addEventListener('click', () => {
                this.showAddFolderModal('');
            });
        }
        
        this.container.querySelector('#hezl-add-prompt-btn').addEventListener('click', () => {
            if (this.currentFolderType === 'csv') {
                this.showAddPromptModal(this.currentFolder);
            }
        });

        this.container.querySelector('#hezl-remove-all').addEventListener('click', () => {
            this.removeAllPrompts();
        });
        
        this.container.querySelector('#hezl-disable-all').addEventListener('click', () => {
            this.toggleAllPromptsDisabled(true);
        });
        
        this.container.querySelector('#hezl-enable-all').addEventListener('click', () => {
            this.toggleAllPromptsDisabled(false);
        });
        
        this.previewContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        this.previewContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
            if (!isNaN(dragIndex)) {
                const dropTarget = e.target.closest('.hezl-preview-item');
                if (dropTarget) {
                    const dropIndex = parseInt(dropTarget.dataset.index);
                    this.reorderPrompts(dragIndex, dropIndex);
                } else {
                    const lastIndex = this.selectedPrompts.length - 1;
                    this.reorderPrompts(dragIndex, lastIndex);
                }
            }
        });
        
        document.addEventListener('click', (e) => {
            if (this.contextMenu && !this.contextMenu.contains(e.target)) {
                this.hideContextMenu();
            }
        });
        
        this.folderTree.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.hezl-folder-item')) return;
            e.preventDefault();
            this.showContextMenu(e, '', 'blank');
        });
    }

    setupSplitters() {
        if (this.verticalSplitter && this.sidebar) {
            const minSidebar = 140;
            const minList = 200;
            this.verticalSplitter.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = this.sidebar.getBoundingClientRect().width;
                const onMove = (moveEvent) => {
                    const containerRect = this.container.getBoundingClientRect();
                    const splitterWidth = this.verticalSplitter.getBoundingClientRect().width;
                    const maxWidth = containerRect.width - minList - splitterWidth;
                    let newWidth = startWidth + (moveEvent.clientX - startX);
                    newWidth = Math.max(minSidebar, Math.min(maxWidth, newWidth));
                    if (this._splitterRaf) cancelAnimationFrame(this._splitterRaf);
                    this._splitterRaf = requestAnimationFrame(() => {
                        this.sidebar.style.width = `${newWidth}px`;
                    });
                };
                const onUp = () => {
                    if (this._splitterRaf) {
                        cancelAnimationFrame(this._splitterRaf);
                        this._splitterRaf = null;
                    }
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        }

        if (this.horizontalSplitter && this.bottomPanel) {
            const minBottom = 120;
            const minTop = 120;
            this.horizontalSplitter.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const startY = e.clientY;
                const startBottom = this.bottomPanel.getBoundingClientRect().height;
                const onMove = (moveEvent) => {
                    const containerRect = this.container.getBoundingClientRect();
                    const splitterHeight = this.horizontalSplitter.getBoundingClientRect().height;
                    const maxBottom = containerRect.height - minTop - splitterHeight;
                    let newBottom = startBottom - (moveEvent.clientY - startY);
                    newBottom = Math.max(minBottom, Math.min(maxBottom, newBottom));
                    if (this._splitterRaf) cancelAnimationFrame(this._splitterRaf);
                    this._splitterRaf = requestAnimationFrame(() => {
                        this.bottomPanel.style.flexBasis = `${newBottom}px`;
                    });
                };
                const onUp = () => {
                    if (this._splitterRaf) {
                        cancelAnimationFrame(this._splitterRaf);
                        this._splitterRaf = null;
                    }
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        }
    }
    
    async loadFolderStructure() {
        try {
            const response = await fetch('/hezl_prompt/get_structure');
            this.folderStructure = await response.json();
            this.renderFolderTree();
            
            if (this.uiState) {
                this.restoreUiState();
            }
            
            const searchInput = this.container.querySelector('#hezl-folder-search');
            if(searchInput && searchInput.value) {
                this.filterFolderTree(searchInput.value.toLowerCase());
            }
            if (this.selectedPrompts.length > 0) {
                this.updateFolderCounts();
            }
        } catch (error) {
            console.error('Failed to load folder structure:', error);
        }
    }
    
    getAllCsvPaths(node) {
        let paths = [];
        if (node.type === 'csv') {
            paths.push(node.path);
        }
        if (node.children) {
            for (const child of node.children) {
                paths = paths.concat(this.getAllCsvPaths(child));
            }
        }
        return paths;
    }
    
    calculateFolderCounts(node) {
        let count = 0;
        if (node.type === 'csv') {
            count = this.folderSelectedCounts[node.path] || 0;
        }
        if (node.children) {
            for (const child of node.children) {
                count += this.calculateFolderCounts(child);
            }
        }
        return count;
    }
    
    renderFolderTree() {
        if (!this.folderStructure) return;
        
        const renderNode = (node, indent = 0) => {
            let html = '';
            
            if (node.type === 'folder') {
                const hasChildren = node.children && node.children.length > 0;
                const isExpanded = this.expandedFolders.has(node.path);
                const toggleIcon = hasChildren ? (isExpanded ? '▼' : '▶') : '';
                const totalCount = this.calculateFolderCounts(node);
                const countBadge = totalCount > 0 ? `<span class="hezl-folder-count" data-path="${node.path}" title="点击取消选择">${totalCount}</span>` : '';
                const isSelected = this.currentFolder === node.path ? 'selected' : '';
                
                html += `<div class="hezl-folder-item ${isSelected}" data-path="${node.path}" data-type="folder" style="padding-left: ${indent * 12 + 6}px">
                    <span class="hezl-tree-toggle" data-path="${node.path}">${toggleIcon}</span>
                    <span class="hezl-folder-icon">${hasChildren ? (isExpanded ? '📂' : '📁') : '📁'}</span>
                    <span class="hezl-folder-name">${node.name}</span>
                    ${countBadge}
                </div>`;
                
                if (hasChildren) {
                    const childrenHtml = node.children.map(child => renderNode(child, indent + 1)).join('');
                    const collapsedClass = isExpanded ? '' : 'collapsed';
                    html += `<div class="hezl-folder-children ${collapsedClass}" data-parent="${node.path}">${childrenHtml}</div>`;
                }
            } else if (node.type === 'csv') {
                const count = this.folderSelectedCounts[node.path] || 0;
                const countBadge = count > 0 ? `<span class="hezl-folder-count" data-path="${node.path}" title="点击取消选择">${count}</span>` : '';
                const isSelected = this.currentFolder === node.path ? 'selected' : '';
                
                html += `<div class="hezl-folder-item ${isSelected}" data-path="${node.path}" data-type="csv" style="padding-left: ${indent * 12 + 6}px">
                    <span class="hezl-tree-toggle"></span>
                    <span class="hezl-folder-icon">📄</span>
                    <span class="hezl-folder-name">${node.name}</span>
                    ${countBadge}
                </div>`;
            }
            
            return html;
        };
        
        let treeHtml = '';
        
        if (this.folderStructure.default) {
            for (const child of this.folderStructure.default.children || []) {
                treeHtml += renderNode(child, 0);
            }
        }
        
        this.folderTree.innerHTML = treeHtml;
        
        this.folderTree.querySelectorAll('.hezl-tree-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const folderPath = toggle.dataset.path;
                if (folderPath) {
                    this.toggleFolderExpand(folderPath);
                }
            });
        });
        
        this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('hezl-folder-count')) {
                    e.stopPropagation();
                    this.clearFolderSelection(item.dataset.path);
                } else {
                    if (this.currentFolder === item.dataset.path) {
                        this.deselectFolder();
                    } else {
                        this.selectFolder(item.dataset.path, item.dataset.type);
                    }
                }
            });
            
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, item.dataset.path, item.dataset.type);
            });
        });
    }
    
    showContextMenu(e, path, type, extra = {}) {
        this.hideContextMenu();
        
        this.contextMenu = document.createElement('div');
        this.contextMenu.className = 'hezl-context-menu';
        
        let menuHtml = '';
        
        if (type === 'folder') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-folder">添加子文件夹</div>
                <div class="hezl-context-menu-item" data-action="add-csv">新建 CSV 文件</div>
                <div style="border-top: 1px solid #333; margin: 4px 0;"></div>
                <div class="hezl-context-menu-item" data-action="rename-folder">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete-folder" style="color: #ff453a;">删除</div>
            `;
        } else if (type === 'csv') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="add-prompt">添加词组</div>
                <div style="border-top: 1px solid #333; margin: 4px 0;"></div>
                <div class="hezl-context-menu-item" data-action="rename-csv">重命名</div>
                <div class="hezl-context-menu-item" data-action="delete-csv" style="color: #ff453a;">删除</div>
            `;
        } else if (type === 'prompt') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="edit-prompt">编辑</div>
                <div class="hezl-context-menu-item" data-action="delete-prompt" style="color: #ff453a;">删除</div>
            `;
        } else if (type === 'blank') {
            menuHtml = `
                <div class="hezl-context-menu-item" data-action="refresh">刷新</div>
            `;
        }

        this.contextMenu.innerHTML = menuHtml;
        document.body.appendChild(this.contextMenu);
        
        this.contextMenu.style.left = e.clientX + 'px';
        this.contextMenu.style.top = e.clientY + 'px';
        
        this.contextMenu.querySelectorAll('.hezl-context-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'add-folder') {
                    this.showAddFolderModal(path);
                } else if (action === 'add-csv') {
                    this.showCreateCsvModal(path);
                } else if (action === 'rename-folder') {
                    this.showRenameFolderModal(path);
                } else if (action === 'delete-folder') {
                    if (confirm('确定删除此文件夹吗？')) {
                        this.deleteFolder(path);
                    }
                } else if (action === 'add-prompt') {
                    this.showAddPromptModal(path);
                } else if (action === 'rename-csv') {
                    this.showRenameCsvModal(path);
                } else if (action === 'delete-csv') {
                    if (confirm('确定删除此CSV文件吗？')) {
                        this.deleteCsvFile(path);
                    }
                } else if (action === 'edit-prompt') {
                    this.showEditPromptModal(extra.title, extra.source || path);
                } else if (action === 'delete-prompt') {
                    this.deletePrompt(extra.title, extra.source || path);
                } else if (action === 'refresh') {
                    this.loadFolderStructure();
                } else if (action === 'clear') {
                    this.clearFolderSelection(path);
                }
                this.hideContextMenu();
            });
        });
    }
    
    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.remove();
            this.contextMenu = null;
        }
    }
    
    toggleFolderExpand(folderPath) {
        if (this.expandedFolders.has(folderPath)) {
            this.expandedFolders.delete(folderPath);
        } else {
            this.expandedFolders.add(folderPath);
        }
        this.renderFolderTree();
        this.saveStateToWidget(); 
    }
    
    async selectFolder(path, type) {
        this.currentFolder = path;
        this.currentFolderType = type;
        this.saveStateToWidget(); 
        
        const addBtn = this.container.querySelector('#hezl-add-prompt-btn');
        const descArea = this.container.querySelector('#hezl-csv-description');
        
        if (type === 'csv') {
            if(addBtn) addBtn.style.display = 'inline-flex';
            if(descArea) descArea.style.display = 'flex';
        } else {
            if(addBtn) addBtn.style.display = 'none';
            if(descArea) descArea.style.display = 'none';
        }

        this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.path === path) {
                item.classList.add('selected');
            }
        });
        
        try {
            const response = await fetch(`/hezl_prompt/get_prompts?folder=${encodeURIComponent(path)}`);
            this.promptsData = await response.json();
            this.renderPromptList();
        } catch (error) {
            console.error('Failed to load prompts:', error);
            this.promptList.innerHTML = '<div class="hezl-empty-state">加载失败</div>';
        }
    }
    
    deselectFolder() {
        this.currentFolder = '';
        this.currentFolderType = '';
        this.promptsData = [];
        this.saveStateToWidget(); 
        
        const addBtn = this.container.querySelector('#hezl-add-prompt-btn');
        const descArea = this.container.querySelector('#hezl-csv-description');
        if(addBtn) addBtn.style.display = 'none';
        if(descArea) descArea.style.display = 'none';

        this.folderTree.querySelectorAll('.hezl-folder-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        this.promptList.innerHTML = '<div style="text-align:center; padding: 40px; color:#666; font-size:12px; width:100%;">请在左侧选择一个 CSV 文件查看词组</div>';
    }
    
    renderPromptList() {
        if (this.currentFolderType === 'csv') {
            const descPrompt = this.promptsData.find(p => p.title === '__DESCRIPTION__');
            const descArea = this.container.querySelector('#hezl-csv-description');
            if (descArea) {
                const textSpan = descArea.querySelector('.text');
                if (descPrompt && descPrompt.content) {
                    textSpan.textContent = descPrompt.content;
                    textSpan.style.color = '#ddd';
                } else {
                    textSpan.textContent = '暂无说明，点击右侧编辑添加...';
                    textSpan.style.color = '#666';
                }
                
                descArea.querySelector('#hezl-edit-desc-btn').onclick = () => {
                    this.showEditDescriptionModal(descPrompt ? descPrompt.content : '');
                };
            }
        }

        const visiblePrompts = this.promptsData.filter(p => p.title !== '__DESCRIPTION__');

        if (visiblePrompts.length === 0) {
            this.promptList.innerHTML = '<div style="text-align:center; padding: 40px; color:#666; font-size:12px; width:100%;">此 CSV 中暂无词组，请点击上方添加</div>';
            return;
        }
        
        let html = '';
        for (let index = 0; index < this.promptsData.length; index++) {
            const prompt = this.promptsData[index];
            if (prompt.title === '__DESCRIPTION__') continue; 

            const uid = this.getUid(prompt);
            const isSelected = this.selectedPrompts.some(p => this.getUid(p) === uid);
            html += `
                <div class="hezl-prompt-item-wrapper ${isSelected ? 'selected' : ''}" 
                     data-title="${this.escapeHtml(prompt.title)}" 
                     data-folder="${this.currentFolder}"
                     data-source="${this.escapeHtml(prompt.source || this.currentFolder)}"
                     data-index="${index}">
                    <div class="hezl-prompt-item-content">
                        <div class="hezl-prompt-title ${isSelected ? 'selected' : ''}">${this.escapeHtml(prompt.title)}</div>
                    </div>
                    <button class="hezl-prompt-edit-btn" data-title="${this.escapeHtml(prompt.title)}">编辑</button>
                </div>
            `;
        }
        
        this.promptList.innerHTML = html;
        
        const canReorder = this.currentFolderType === 'csv';
        this.promptList.querySelectorAll('.hezl-prompt-item-wrapper').forEach(wrapper => {
            const content = wrapper.querySelector('.hezl-prompt-item-content');
            if (!content) return;
            
            content.addEventListener('click', () => {
                this.togglePromptSelection(wrapper.dataset.title, wrapper.dataset.source);
            });
            
            wrapper.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, wrapper.dataset.source, 'prompt', {
                    title: wrapper.dataset.title,
                    source: wrapper.dataset.source
                });
            });
            
            content.addEventListener('mouseenter', (e) => {
                const promptTitle = wrapper.dataset.title;
                const promptSource = wrapper.dataset.source;
                const prompt = this.promptsData.find(p => {
                    const source = p.source || this.currentFolder;
                    return p.title === promptTitle && source === promptSource;
                });
                if (prompt) {
                    this.showHoverPreview(e, prompt);
                }
            });
            
            content.addEventListener('mouseleave', () => {
                this.hideHoverPreview();
            });

            wrapper.draggable = canReorder;
            
            wrapper.addEventListener('dragstart', (e) => {
                if (!canReorder) {
                    e.preventDefault();
                    return;
                }
                wrapper.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', wrapper.dataset.index);
            });
            
            wrapper.addEventListener('dragend', () => {
                wrapper.classList.remove('dragging');
                this.promptList.querySelectorAll('.hezl-prompt-item-wrapper').forEach(i => {
                    i.classList.remove('drag-over', 'insert-before', 'insert-after');
                });
            });
            
            wrapper.addEventListener('dragover', (e) => {
                if (!canReorder) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (wrapper.classList.contains('dragging')) return;
                
                this.promptList.querySelectorAll('.hezl-prompt-item-wrapper').forEach(i => {
                    if (i !== wrapper) {
                        i.classList.remove('insert-before', 'insert-after');
                    }
                });
                
                const rect = wrapper.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX < midX) {
                    wrapper.classList.remove('insert-after');
                    wrapper.classList.add('insert-before');
                } else {
                    wrapper.classList.remove('insert-before');
                    wrapper.classList.add('insert-after');
                }
            });
            
            wrapper.addEventListener('dragenter', (e) => {
                if (!canReorder) return;
                e.preventDefault();
                if (!wrapper.classList.contains('dragging')) {
                    wrapper.classList.add('drag-over');
                }
            });
            
            wrapper.addEventListener('dragleave', (e) => {
                if (!canReorder) return;
                const rect = wrapper.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right ||
                    e.clientY < rect.top || e.clientY > rect.bottom) {
                    wrapper.classList.remove('drag-over', 'insert-before', 'insert-after');
                }
            });
            
            wrapper.addEventListener('drop', (e) => {
                if (!canReorder) return;
                e.preventDefault();
                wrapper.classList.remove('drag-over', 'insert-before', 'insert-after');
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                let dropIndex = parseInt(wrapper.dataset.index);
                
                const rect = wrapper.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX >= midX && dragIndex < dropIndex) {
                    dropIndex = dropIndex + 1;
                }
                
                if (!isNaN(dragIndex) && !isNaN(dropIndex) && dragIndex !== dropIndex) {
                    this.reorderPromptList(dragIndex, dropIndex);
                }
            });
        });
        
        const promptSearchInput = this.container.querySelector('#hezl-prompt-search');
        if (promptSearchInput && promptSearchInput.value) {
            const type = this.container.querySelector('#hezl-prompt-search-type').value;
            this.filterPrompts(promptSearchInput.value.toLowerCase(), type);
        }
    }

    async showEditDescriptionModal(oldText) {
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">编辑该 CSV 文件的说明和描述：</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">说明内容</label>
                    <textarea class="hezl-form-textarea" id="hezl-desc-content" placeholder="输入关于此CSV文件的详细说明...">${this.escapeHtml(oldText)}</textarea>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn warning" id="hezl-modal-clear" style="margin-right: auto;">清空</button>
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-clear').addEventListener('click', () => {
            const contentArea = modal.querySelector('#hezl-desc-content');
            contentArea.value = '';
            contentArea.focus();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newText = modal.querySelector('#hezl-desc-content').value.trim();
            const folder = this.currentFolder;
            
            try {
                if (!oldText && newText) {
                    await fetch('/hezl_prompt/add_prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ folder: folder, title: '__DESCRIPTION__', content: newText })
                    });
                } else if (oldText && newText) {
                    await fetch('/hezl_prompt/update_prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ folder: folder, old_title: '__DESCRIPTION__', new_title: '__DESCRIPTION__', new_content: newText })
                    });
                } else if (oldText && !newText) {
                    await fetch('/hezl_prompt/delete_prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ folder: folder, title: '__DESCRIPTION__' })
                    });
                }
                
                modal.remove();
                await this.selectFolder(folder, 'csv');
            } catch (error) {
                alert('保存说明失败: ' + error.message);
            }
        });
        
        this.setupModalClose(modal);
    }
    
    async showEditPromptModal(promptTitle, promptSource = null) {
        const prompt = this.promptsData.find(p => {
            const source = p.source || this.currentFolder;
            const targetSource = promptSource || this.currentFolder;
            return p.title === promptTitle && source === targetSource;
        });
        if (!prompt) return;
        
        const folder = promptSource || this.currentFolder;
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">编辑词组</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">标题</label>
                    <input type="text" class="hezl-form-input" id="hezl-edit-title" value="${this.escapeHtml(prompt.title)}">
                </div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">内容</label>
                    <textarea class="hezl-form-textarea" id="hezl-edit-content">${this.escapeHtml(prompt.content)}</textarea>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn warning" id="hezl-modal-clear" style="margin-right: auto;">清空</button>
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-clear').addEventListener('click', () => {
            const contentArea = modal.querySelector('#hezl-edit-content');
            contentArea.value = '';
            contentArea.focus();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newTitle = modal.querySelector('#hezl-edit-title').value.trim();
            const newContent = modal.querySelector('#hezl-edit-content').value.trim();
            
            if (!newTitle) {
                alert('请输入标题');
                return;
            }
            if (newTitle === '__DESCRIPTION__') {
                alert('__DESCRIPTION__ 是保留关键字，请使用其他标题');
                return;
            }
            
            if (newTitle !== prompt.title) {
                const existingPrompt = this.promptsData.find(p => p.title === newTitle && p.title !== promptTitle);
                if (existingPrompt) {
                    alert('已存在同名词组，请使用不同的标题');
                    return;
                }
            }
            
            try {
                const response = await fetch('/hezl_prompt/update_prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        old_title: prompt.title,
                        new_title: newTitle,
                        new_content: newContent
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    const oldUid = folder + '::' + prompt.title;
                    const newUid = folder + '::' + newTitle;
                    
                    const selectedIndex = this.selectedPrompts.findIndex(p => this.getUid(p) === oldUid);
                    if (selectedIndex !== -1) {
                        this.selectedPrompts[selectedIndex].title = newTitle;
                        this.selectedPrompts[selectedIndex].content = newContent;
                        if (prompt.title !== newTitle) {
                            this.promptWeights[newUid] = this.promptWeights[oldUid];
                            this.promptDisabled[newUid] = this.promptDisabled[oldUid];
                            delete this.promptWeights[oldUid];
                            delete this.promptDisabled[oldUid];
                        }
                        this.renderPreview();
                        this.updateOutput();
                    }
                    
                    modal.remove();
                    const nextType = folder && folder.toLowerCase().endsWith('.csv') ? 'csv' : this.currentFolderType;
                    await this.selectFolder(folder, nextType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
        
        this.setupModalClose(modal);
    }
    
    async showAddPromptModal(csvPath = null) {
        if (csvPath) {
            this.currentFolder = csvPath;
            this.currentFolderType = 'csv';
        }
        if (!this.currentFolder || this.currentFolderType !== 'csv') {
            alert('请选中csv文件');
            return;
        }
        
        const folder = this.currentFolder;
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">添加词组</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">标题</label>
                    <input type="text" class="hezl-form-input" id="hezl-add-title" placeholder="输入标题">
                </div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">内容</label>
                    <textarea class="hezl-form-textarea" id="hezl-add-content" placeholder="输入内容"></textarea>
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newTitle = modal.querySelector('#hezl-add-title').value.trim();
            const newContent = modal.querySelector('#hezl-add-content').value.trim();
            
            if (!newTitle) {
                alert('请输入标题');
                return;
            }
            if (newTitle === '__DESCRIPTION__') {
                alert('__DESCRIPTION__ 是保留关键字，请使用其他标题');
                return;
            }
            
            const existingPrompt = this.promptsData.find(p => p.title === newTitle);
            if (existingPrompt) {
                alert('已存在同名词组，请使用不同的标题');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/add_prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: folder,
                        title: newTitle,
                        content: newContent
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    await this.selectFolder(folder, this.currentFolderType);
                } else {
                    alert('保存失败: ' + result.error);
                }
            } catch (error) {
                alert('保存失败: ' + error.message);
            }
        });
        
        this.setupModalClose(modal);
    }
    
    showHoverPreview(e, prompt) {
        this.hideHoverPreview();
        
        this.hoverPreview = document.createElement('div');
        this.hoverPreview.className = 'hezl-hover-preview';
        this.hoverPreview.innerHTML = `<div class="hezl-hover-preview-text">${this.escapeHtml(prompt.content)}</div>`;
        
        document.body.appendChild(this.hoverPreview);
        
        let x = e.clientX + 10;
        let y = e.clientY + 10;
        
        this.hoverPreview.style.left = x + 'px';
        this.hoverPreview.style.top = y + 'px';
        
        const moveHandler = (moveEvent) => {
            let newX = moveEvent.clientX + 10;
            let newY = moveEvent.clientY + 10;
            
            if (newX + 300 > window.innerWidth) {
                newX = moveEvent.clientX - 310;
            }
            if (newY + 250 > window.innerHeight) {
                newY = moveEvent.clientY - 260;
            }
            
            this.hoverPreview.style.left = newX + 'px';
            this.hoverPreview.style.top = newY + 'px';
        };
        
        document.addEventListener('mousemove', moveHandler);
        this.hoverPreview._moveHandler = moveHandler;
    }
    
    hideHoverPreview() {
        if (this.hoverPreview) {
            if (this.hoverPreview._moveHandler) {
                document.removeEventListener('mousemove', this.hoverPreview._moveHandler);
            }
            this.hoverPreview.remove();
            this.hoverPreview = null;
        }
    }
    
    togglePromptSelection(promptTitle, promptSource) {
        const prompt = this.promptsData.find(p => p.title === promptTitle && (p.source || this.currentFolder) === promptSource);
        if (!prompt) return;
        
        const uid = this.getUid(prompt);
        const existingIndex = this.selectedPrompts.findIndex(p => this.getUid(p) === uid);
        
        if (existingIndex === -1) {
            const newPrompt = {
                title: prompt.title,
                content: prompt.content,
                folder: promptSource
            };
            this.selectedPrompts.push(newPrompt);
            this.promptWeights[uid] = 1.0;
            this.promptDisabled[uid] = false;
        } else {
            this.selectedPrompts.splice(existingIndex, 1);
            delete this.promptWeights[uid];
            delete this.promptDisabled[uid];
        }
        
        this.updateFolderCounts();
        this.renderPromptList();
        this.renderPreview();
        this.updateOutput();
    }
    
    updateFolderCounts() {
        this.folderSelectedCounts = {};
        
        for (const prompt of this.selectedPrompts) {
            const folder = prompt.folder || '';
            if (folder) {
                this.folderSelectedCounts[folder] = (this.folderSelectedCounts[folder] || 0) + 1;
            }
        }
        
        this.renderFolderTree();
    }
    
    syncSelectionState() {
        this.updateFolderCounts();
        this.renderPreview();
        this.updateOutput();
        
        if (this.promptsData.length > 0) {
            this.renderPromptList();
        }
    }
    
    renderPreview() {
        if (this.selectedPrompts.length === 0) {
            this.previewContainer.innerHTML = '<div style="text-align:center; padding: 15px; color:#666; font-size:12px; width:100%;user-select: none;">点击上方词组添加到预览</div>';
            return;
        }
        
        let html = '';
        this.selectedPrompts.forEach((prompt, index) => {
            const uid = this.getUid(prompt);
            const weight = this.promptWeights[uid] || 1.0;
            const isDisabled = this.promptDisabled[uid] || false;
            html += `
                <div class="hezl-preview-item ${isDisabled ? 'disabled' : ''}" data-index="${index}" draggable="true">
                    <span class="hezl-preview-text" title="${this.escapeHtml(prompt.content)}">${this.escapeHtml(prompt.title)}</span>
                    <div class="hezl-weight-control">
                        <button class="hezl-weight-btn" data-action="decrease">-</button>
                        <span class="hezl-weight-value">${weight.toFixed(2)}</span>
                        <button class="hezl-weight-btn" data-action="increase">+</button>
                    </div>
                    <button class="hezl-remove-btn" data-index="${index}">✕</button>
                </div>
            `;
        });
        
        this.previewContainer.innerHTML = html;
        
        this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('hezl-weight-btn') && 
                    !e.target.classList.contains('hezl-remove-btn')) {
                    const index = parseInt(item.dataset.index);
                    const prompt = this.selectedPrompts[index];
                    if (prompt) {
                        this.togglePromptDisabled(this.getUid(prompt));
                    }
                }
            });
            
            item.addEventListener('dragstart', (e) => {
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', item.dataset.index);
                e.dataTransfer.effectAllowed = 'move';
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
                    i.classList.remove('drag-over', 'insert-before', 'insert-after');
                });
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                if (item.classList.contains('dragging')) return;
                
                this.previewContainer.querySelectorAll('.hezl-preview-item').forEach(i => {
                    if (i !== item) {
                        i.classList.remove('insert-before', 'insert-after');
                    }
                });
                
                const rect = item.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX < midX) {
                    item.classList.remove('insert-after');
                    item.classList.add('insert-before');
                } else {
                    item.classList.remove('insert-before');
                    item.classList.add('insert-after');
                }
            });
            
            item.addEventListener('dragenter', (e) => {
                e.preventDefault();
                if (!item.classList.contains('dragging')) {
                    item.classList.add('drag-over');
                }
            });
            
            item.addEventListener('dragleave', (e) => {
                const rect = item.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right || 
                    e.clientY < rect.top || e.clientY > rect.bottom) {
                    item.classList.remove('drag-over', 'insert-before', 'insert-after');
                }
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.classList.remove('drag-over', 'insert-before', 'insert-after');
                const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                let dropIndex = parseInt(item.dataset.index);
                
                const rect = item.getBoundingClientRect();
                const midX = rect.left + rect.width / 2;
                
                if (e.clientX >= midX && dragIndex < dropIndex) {
                    dropIndex = dropIndex + 1;
                }
                
                if (!isNaN(dragIndex) && !isNaN(dropIndex) && dragIndex !== dropIndex) {
                    this.reorderPrompts(dragIndex, dropIndex);
                }
            });
        });
        
        this.previewContainer.querySelectorAll('.hezl-weight-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = btn.closest('.hezl-preview-item');
                const index = parseInt(item.dataset.index);
                const prompt = this.selectedPrompts[index];
                if (!prompt) return;
                
                const uid = this.getUid(prompt);
                const action = btn.dataset.action;
                
                let weight = this.promptWeights[uid] || 1.0;
                if (action === 'increase') {
                    weight = Math.min(2.0, weight + 0.1);
                } else {
                    weight = Math.max(0.1, weight - 0.1);
                }
                this.promptWeights[uid] = weight;
                this.renderPreview();
                this.updateOutput();
            });
        });
        
        this.previewContainer.querySelectorAll('.hezl-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                const prompt = this.selectedPrompts[index];
                if (prompt) {
                    this.removePromptByUid(this.getUid(prompt));
                }
            });
        });
    }
    
    togglePromptDisabled(uid) {
        this.promptDisabled[uid] = !this.promptDisabled[uid];
        this.renderPreview();
        this.updateOutput();
    }
    
    removePromptByUid(uid) {
        const index = this.selectedPrompts.findIndex(p => this.getUid(p) === uid);
        if (index !== -1) {
            this.selectedPrompts.splice(index, 1);
            delete this.promptWeights[uid];
            delete this.promptDisabled[uid];
            
            this.updateFolderCounts();
            this.renderPromptList();
            this.renderPreview();
            this.updateOutput();
        }
    }
    
    async deletePrompt(promptTitle, promptSource) {
        if (!promptTitle || !promptSource) return;
        if (!confirm('\u786e\u5b9a\u5220\u9664\u8be5\u8bcd\u7ec4\u5417?')) {
            return;
        }

        try {
            const response = await fetch('/hezl_prompt/delete_prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folder: promptSource,
                    title: promptTitle
                })
            });

            const result = await response.json();

            if (result.success) {
                this.promptsData = this.promptsData.filter(p => {
                    const source = p.source || this.currentFolder;
                    return !(p.title === promptTitle && source === promptSource);
                });

                const uid = promptSource + '::' + promptTitle;
                const selectedIndex = this.selectedPrompts.findIndex(p => this.getUid(p) === uid);
                if (selectedIndex !== -1) {
                    this.selectedPrompts.splice(selectedIndex, 1);
                    delete this.promptWeights[uid];
                    delete this.promptDisabled[uid];
                }

                this.updateFolderCounts();
                this.renderPromptList();
                this.renderPreview();
                this.updateOutput();
            } else {
                alert('\u5220\u9664\u5931\u8d25: ' + result.error);
            }
        } catch (error) {
            alert('\u5220\u9664\u5931\u8d25: ' + error.message);
        }
    }

    removeAllPrompts() {
        if (this.selectedPrompts.length === 0) return;
        this.selectedPrompts = [];
        this.promptWeights = {};
        this.promptDisabled = {};
        
        this.updateFolderCounts();
        this.renderPromptList();
        this.renderPreview();
        this.updateOutput();
    }
    
    toggleAllPromptsDisabled(disabled) {
        for (const prompt of this.selectedPrompts) {
            this.promptDisabled[this.getUid(prompt)] = disabled;
        }
        this.renderPreview();
        this.updateOutput();
    }
    
    reorderPrompts(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        
        const item = this.selectedPrompts.splice(fromIndex, 1)[0];
        
        if (fromIndex < toIndex) {
            toIndex--;
        }
        
        this.selectedPrompts.splice(toIndex, 0, item);
        
        this.renderPreview();
        this.updateOutput();
    }

    async reorderPromptList(fromIndex, toIndex) {
        if (this.currentFolderType !== 'csv') return;
        if (fromIndex === toIndex) return;
        
        const item = this.promptsData.splice(fromIndex, 1)[0];
        
        if (fromIndex < toIndex) {
            toIndex--;
        }
        
        this.promptsData.splice(toIndex, 0, item);
        
        await this.persistPromptOrder();
        this.renderPromptList();
    }

    async persistPromptOrder() {
        if (this.currentFolderType !== 'csv') return;
        
        try {
            const response = await fetch('/hezl_prompt/reorder_prompts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folder: this.currentFolder,
                    prompts: this.promptsData.map(p => ({
                        title: p.title,
                        content: p.content
                    }))
                })
            });
            
            const result = await response.json();
            if (!result.success) {
                alert('排序保存失败: ' + result.error);
            }
        } catch (error) {
            alert('排序保存失败: ' + error.message);
        }
    }
    
    updateOutput() {
        const parts = [];
        for (const p of this.selectedPrompts) {
            const uid = this.getUid(p);
            if (this.promptDisabled[uid]) continue;
            
            const weight = this.promptWeights[uid] || 1.0;
            if (weight !== 1.0) {
                parts.push(`(${p.content}:${weight.toFixed(2)})`);
            } else {
                parts.push(p.content);
            }
        }
        
        const output = parts.join(', ');
        this.outputText.textContent = output;
        
        this.saveStateToWidget(); 
    }
    
    clearFolderSelection(folderPath) {
        const csvPaths = [];
        const collectCsvPaths = (node) => {
            if (node.type === 'csv' && node.path === folderPath) {
                csvPaths.push(node.path);
            } else if (node.type === 'csv' && node.path.startsWith(folderPath + '/') || node.path.startsWith(folderPath + '\\')) {
                csvPaths.push(node.path);
            }
            if (node.type === 'folder' && (node.path === folderPath || node.path.startsWith(folderPath + '/') || node.path.startsWith(folderPath + '\\'))) {
                if (node.children) {
                    node.children.forEach(collectCsvPaths);
                }
            }
            if (node.type === 'folder' && folderPath === '') {
                if (node.children) {
                    node.children.forEach(collectCsvPaths);
                }
            }
        };
        
        if (this.folderStructure && this.folderStructure.default) {
            this.folderStructure.default.children.forEach(collectCsvPaths);
        }
        
        const promptsToRemove = this.selectedPrompts.filter(p => {
            return csvPaths.includes(p.folder) || p.folder === folderPath;
        });
        
        if (promptsToRemove.length === 0) return;
        
        if (confirm(`确定要取消选择此文件夹中的 ${promptsToRemove.length} 个词组吗？`)) {
            this.selectedPrompts = this.selectedPrompts.filter(p => {
                return !csvPaths.includes(p.folder) && p.folder !== folderPath;
            });
            
            for (const prompt of promptsToRemove) {
                const uid = this.getUid(prompt);
                delete this.promptWeights[uid];
                delete this.promptDisabled[uid];
            }
            
            this.updateFolderCounts();
            this.renderPromptList();
            this.renderPreview();
            this.updateOutput();
        }
    }
    
    showAddFolderModal(parentPath = null) {
        const parent = ''; 
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">添加文件夹</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">文件夹名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-folder-name" placeholder="输入文件夹名称">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">创建</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const name = modal.querySelector('#hezl-folder-name').value.trim();
            
            if (!name) {
                alert('请输入文件夹名称');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/add_folder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        parent: parent,
                        name: name
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    this.loadFolderStructure();
                } else {
                    alert('创建失败: ' + result.error);
                }
            } catch (error) {
                alert('创建失败: ' + error.message);
            }
        });
        
        this.setupModalClose(modal);
    }
    
    showCreateCsvModal(folderPath = null) {
        if (folderPath) {
            this.currentFolder = folderPath;
            this.currentFolderType = 'folder';
        }
        if (!this.currentFolder || this.currentFolderType !== 'folder') {
            alert('请选择文件夹');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">新建 CSV 文件</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">文件名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-csv-name" placeholder="输入文件名称（不需要.csv后缀）">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">创建</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const name = modal.querySelector('#hezl-csv-name').value.trim();
            
            if (!name) {
                alert('请输入文件名称');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/create_csv_file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        folder: this.currentFolder,
                        name: name
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    this.loadFolderStructure();
                } else {
                    alert('创建失败: ' + result.error);
                }
            } catch (error) {
                alert('创建失败: ' + error.message);
            }
        });
        
        this.setupModalClose(modal);
    }
    
    showRenameFolderModal(folderPath = null) {
        const path = folderPath || this.currentFolder;
        if (!path) {
            alert('请先选择一个文件夹');
            return;
        }
        
        const folderName = path.split(/[/\\]/).pop();
        
        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">重命名文件夹</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">新名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-new-name" value="${folderName}" placeholder="输入新名称">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newName = modal.querySelector('#hezl-new-name').value.trim();
            
            if (!newName) {
                alert('请输入新名称');
                return;
            }
            
            try {
                const response = await fetch('/hezl_prompt/rename_folder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: path,
                        new_name: newName
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    modal.remove();
                    this.loadFolderStructure();
                } else {
                    alert('重命名失败: ' + result.error);
                }
            } catch (error) {
                alert('重命名失败: ' + error.message);
            }
        });
        
        this.setupModalClose(modal);
    }
    
    showRenameCsvModal(csvPath = null) {
        const path = csvPath || this.currentFolder;
        if (!path) {
            alert('\u8bf7\u5148\u9009\u62e9CSV\u6587\u4ef6');
            return;
        }

        const fileName = path.split(/[/\\]/).pop();
        const baseName = fileName.replace(/\.csv$/i, '');

        const modal = document.createElement('div');
        modal.className = 'hezl-modal';
        modal.innerHTML = `
            <div class="hezl-modal-content">
                <div class="hezl-modal-header">重命名 CSV 文件</div>
                <div class="hezl-form-group">
                    <label class="hezl-form-label">新名称</label>
                    <input type="text" class="hezl-form-input" id="hezl-new-csv-name" value="${this.escapeHtml(baseName)}" placeholder="\u8f93\u5165\u65b0\u540d\u79f0">
                </div>
                <div class="hezl-modal-actions">
                    <button class="hezl-btn cancel" id="hezl-modal-cancel">取消</button>
                    <button class="hezl-btn success" id="hezl-modal-save">保存</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#hezl-modal-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#hezl-modal-save').addEventListener('click', async () => {
            const newName = modal.querySelector('#hezl-new-csv-name').value.trim();
            if (!newName) {
                alert('\u8bf7\u8f93\u5165\u65b0\u540d\u79f0');
                return;
            }

            try {
                const response = await fetch('/hezl_prompt/rename_csv_file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: path,
                        new_name: newName
                    })
                });

                const result = await response.json();

                if (result.success) {
                    const newPath = result.path || path;
                    this.selectedPrompts.forEach(p => {
                        if (p.folder === path) {
                            p.folder = newPath;
                        }
                    });
                    this.promptsData.forEach(p => {
                        const source = p.source || this.currentFolder;
                        if (source === path) {
                            p.source = newPath;
                        }
                    });
                    if (this.currentFolder === path) {
                        this.currentFolder = newPath;
                        this.currentFolderType = 'csv';
                        this.saveStateToWidget(); 
                    }
                    modal.remove();
                    this.loadFolderStructure();
                    if (this.currentFolder === newPath) {
                        await this.selectFolder(newPath, 'csv');
                    }
                } else {
                    alert('\u91cd\u547d\u540d\u5931\u8d25: ' + result.error);
                }
            } catch (error) {
                alert('\u91cd\u547d\u540d\u5931\u8d25: ' + error.message);
            }
        });

        this.setupModalClose(modal);
    }

    deleteCurrentFolder() {
        if (!this.currentFolder) {
            alert('请先选择要删除的项目');
            return;
        }
        
        if (this.currentFolderType === 'csv') {
            if (!confirm('是否删除此CSV文件？')) {
                return;
            }
            this.deleteCsvFile(this.currentFolder);
        } else {
            if (!confirm('是否删除此文件夹？文件夹内的所有内容都将被删除。')) {
                return;
            }
            this.deleteFolder(this.currentFolder);
        }
    }
    
    async deleteCsvFile(csvPath) {
        if (!csvPath) {
            alert('请先选择CSV文件');
            return;
        }
        
        try {
            const response = await fetch('/hezl_prompt/delete_csv_file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: csvPath
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.selectedPrompts = this.selectedPrompts.filter(p => p.folder !== csvPath);
                this.updateFolderCounts();
                this.renderPreview();
                this.updateOutput();
                this.currentFolder = '';
                this.currentFolderType = '';
                this.saveStateToWidget(); 
                this.loadFolderStructure();
                this.promptList.innerHTML = '<div style="text-align:center; padding: 40px; color:#666; font-size:12px; width:100%;">请在左侧选择一个 CSV 文件查看词组</div>';
            } else {
                alert('删除失败: ' + result.error);
            }
        } catch (error) {
            alert('删除失败: ' + error.message);
        }
    }
    
    async deleteFolder(folderPath) {
        if (!folderPath) {
            alert('请先选择一个文件夹');
            return;
        }
        
        try {
            const response = await fetch('/hezl_prompt/delete_folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: folderPath
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.selectedPrompts = this.selectedPrompts.filter(p => {
                    return p.folder !== folderPath && 
                           !p.folder.startsWith(folderPath + '/') && 
                           !p.folder.startsWith(folderPath + '\\');
                });
                this.updateFolderCounts();
                this.renderPreview();
                this.updateOutput();
                this.currentFolder = '';
                this.currentFolderType = '';
                this.saveStateToWidget(); 
                this.loadFolderStructure();
                this.promptList.innerHTML = '<div style="text-align:center; padding: 40px; color:#666; font-size:12px; width:100%;">请在左侧选择一个 CSV 文件查看词组</div>';
            } else {
                alert('删除失败: ' + result.error);
            }
        } catch (error) {
            alert('删除失败: ' + error.message);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

app.registerExtension({
    name: "hezl.prompt.manager",
    
    async nodeCreated(node, app) {
        if (node.comfyClass === "HezlPrompt") {
            const origWidget = node.widgets?.find(w => w.name === 'selected_prompts');
            if (origWidget) {
                origWidget.hidden = true; 
            }
            
            const hezlWidget = new HezlPromptWidget(node, 'selected_prompts', {}, app);
            node.hezlWidgetInstance = hezlWidget;
            
            const domWidget = node.addDOMWidget('hezl_prompt_ui', 'hezl_prompt', hezlWidget.container, {
                getValue: () => null, 
                setValue: () => {}
            });
            
            if (domWidget) {
                domWidget.serializeValue = false; 
            }
            
            if (origWidget && origWidget.value) {
                hezlWidget.loadStateFromValue(origWidget.value);
            }
        }
    },

    async loadedGraphNode(node, app) {
        if (node.comfyClass === "HezlPrompt") {
            const origWidget = node.widgets?.find(w => w.name === 'selected_prompts');
            if (origWidget && node.hezlWidgetInstance) {
                node.hezlWidgetInstance.loadStateFromValue(origWidget.value);
            }
        }
    }
});
