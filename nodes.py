import json

class HezlPromptNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "selected_prompts": ("STRING", {"default": "{}", "multiline": True}),
            },
            "optional": {
                # 核心修复 1：使用 "forceInput": True 强制让它成为一个连线输入点，而不是文本输入框
                "prompt": ("STRING", {"forceInput": True}),
            },
            "hidden": {
                "prompt_id": "UNIQUE_ID",
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "generate_prompt"
    CATEGORY = "Hezl-Node/Prompt"
    OUTPUT_NODE = True

    def generate_prompt(self, selected_prompts, prompt=None, prompt_id=None):
        try:
            data = json.loads(selected_prompts)
            prompts = data.get("prompts", [])
            weights = data.get("weights", {})
            disabled = data.get("disabled", {})
            
            result_parts = []
            for p in prompts:
                title = p.get("title", "")
                content = p.get("content", "")
                folder = p.get("folder", p.get("source", ""))
                
                # 核心修复 2：匹配前端最新的 UID 逻辑 (folder::title)，解决同名覆盖问题
                uid = f"{folder}::{title}"
                
                # 获取禁用状态（加入 title fallback 以兼容你的旧存盘数据）
                is_disabled = disabled.get(uid, disabled.get(title, False))
                if is_disabled:
                    continue
                
                # 获取权重值
                weight = weights.get(uid, weights.get(title, 1.0))
                
                if weight != 1.0:
                    formatted = f"({content}:{weight:.2f})"
                else:
                    formatted = content
                result_parts.append(formatted)
            
            # 核心修复 3：确保传入的 prompt 不是空字符串或纯空格，避免生成多余的逗号
            if prompt and isinstance(prompt, str) and prompt.strip():
                result_parts.insert(0, prompt.strip())
                
            result = ", ".join(result_parts)
            return (result,)
        except Exception as e:
            return (f"Error: {str(e)}",)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        # 让节点每次都强制更新
        return float("nan")