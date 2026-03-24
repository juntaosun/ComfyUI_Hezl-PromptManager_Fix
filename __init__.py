from .nodes import HezlPromptNode
from .csv_data import CSVDataManager

WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = {
    "HezlPrompt": HezlPromptNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "HezlPrompt": "Hezl-PromptManager",
}

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

import os
import json
from aiohttp import web
from server import PromptServer
import folder_paths  # 引入 ComfyUI 的路径管理模块

# 1. 安全获取 ComfyUI 的 user 目录 (兼容新老版本)
try:
    # 较新版本的 ComfyUI 支持直接获取当前启用的 user 目录
    user_dir = folder_paths.get_user_directory()
except AttributeError:
    # 老版本回退方案：直接指向根目录下的 user/default
    user_dir = os.path.join(folder_paths.base_path, "user", "default")

# 2. 将数据存储路径重定向到 user/default/PromptManager/csv
csv_dir = os.path.join(user_dir, "PromptManager", "csv")
print(f"PromptManager 数据目录: {csv_dir}")

# 确保目标文件夹存在
os.makedirs(csv_dir, exist_ok=True)

# 传入新的专属数据路径
data_manager = CSVDataManager(csv_dir)

routes = PromptServer.instance.routes

@routes.get("/hezl_prompt/get_structure")
async def get_structure(request):
    structure = data_manager.get_folder_structure()
    return web.json_response(structure)

@routes.get("/hezl_prompt/get_prompts")
async def get_prompts(request):
    folder_path = request.rel_url.query.get("folder", "")
    prompts = data_manager.get_prompts_in_folder(folder_path)
    return web.json_response(prompts)

@routes.post("/hezl_prompt/add_folder")
async def add_folder(request):
    data = await request.json()
    result = data_manager.add_folder(
        parent_path=data.get("parent", ""),
        folder_name=data.get("name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_folder")
async def delete_folder(request):
    data = await request.json()
    result = data_manager.delete_folder(
        folder_path=data.get("path", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/rename_folder")
async def rename_folder(request):
    data = await request.json()
    result = data_manager.rename_folder(
        folder_path=data.get("path", ""),
        new_name=data.get("new_name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/update_prompt")
async def update_prompt(request):
    data = await request.json()
    result = data_manager.update_prompt(
        folder=data.get("folder", ""),
        old_title=data.get("old_title", ""),
        new_title=data.get("new_title", ""),
        new_content=data.get("new_content", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/add_prompt")
async def add_prompt(request):
    data = await request.json()
    result = data_manager.add_prompt(
        folder=data.get("folder", ""),
        title=data.get("title", ""),
        content=data.get("content", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/create_csv_file")
async def create_csv_file(request):
    data = await request.json()
    result = data_manager.create_csv_file(
        folder_path=data.get("folder", ""),
        file_name=data.get("name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_csv_file")
async def delete_csv_file(request):
    data = await request.json()
    result = data_manager.delete_csv_file(
        csv_path=data.get("path", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/rename_csv_file")
async def rename_csv_file(request):
    data = await request.json()
    result = data_manager.rename_csv_file(
        csv_path=data.get("path", ""),
        new_name=data.get("new_name", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/delete_prompt")
async def delete_prompt(request):
    data = await request.json()
    result = data_manager.delete_prompt(
        folder=data.get("folder", ""),
        title=data.get("title", "")
    )
    return web.json_response(result)

@routes.post("/hezl_prompt/reorder_prompts")
async def reorder_prompts(request):
    data = await request.json()
    result = data_manager.reorder_prompts(
        folder=data.get("folder", ""),
        prompts=data.get("prompts", [])
    )
    return web.json_response(result)
