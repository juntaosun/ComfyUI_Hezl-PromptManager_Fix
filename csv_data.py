import os
import csv
import shutil
import base64
import itertools

class CSVDataManager:
    # 简单的加密密钥 (你可以随便修改这个字符串，但一旦修改，之前加密的数据将无法解密)
    SECRET_KEY = b"HezlPromptManager"

    def __init__(self, csv_dir):
        self.csv_dir = csv_dir
        self.ensure_directories()
    
    @classmethod
    def encrypt_text(cls, text):
        """简单加密：XOR + Base64，并添加 ENC: 前缀"""
        if not text:
            return text
        try:
            text_bytes = str(text).encode('utf-8')
            # 异或运算
            xored = bytes(a ^ b for a, b in zip(text_bytes, itertools.cycle(cls.SECRET_KEY)))
            # Base64 编码并加上前缀
            return "ENC:" + base64.b64encode(xored).decode('utf-8')
        except Exception as e:
            print(f"Encryption error: {e}")
            return text

    @classmethod
    def decrypt_text(cls, text):
        """简单解密：去除 ENC: 前缀，Base64 解码 + XOR 解密"""
        if not text:
            return text
        # 如果没有加密前缀，说明是旧版明文数据，直接返回即可（完美兼容）
        if not str(text).startswith("ENC:"):
            return text
            
        try:
            b64_str = text[4:] # 截掉 "ENC:" 前缀
            xored = base64.b64decode(b64_str)
            # 异或解密
            decrypted = bytes(a ^ b for a, b in zip(xored, itertools.cycle(cls.SECRET_KEY)))
            return decrypted.decode('utf-8')
        except Exception as e:
            print(f"Decryption error: {e}")
            # 如果解密失败，返回原文本
            return text

    def ensure_directories(self):
        os.makedirs(self.csv_dir, exist_ok=True)
    
    def get_folder_structure(self):
        def scan_directory(base_path, relative_path=""):
            result = {
                "name": os.path.basename(base_path) if relative_path else "root",
                "path": relative_path,
                "type": "folder",
                "children": []
            }
            
            try:
                items = sorted(os.listdir(base_path))
            except:
                return result
            
            for item in items:
                item_path = os.path.join(base_path, item)
                item_rel_path = os.path.join(relative_path, item) if relative_path else item
                
                if os.path.isdir(item_path):
                    child = scan_directory(item_path, item_rel_path)
                    result["children"].append(child)
                elif item.endswith('.csv'):
                    prompt_count = self.count_prompts_in_csv(item_path)
                    result["children"].append({
                        "name": item[:-4],
                        "path": item_rel_path,
                        "type": "csv",
                        "count": prompt_count
                    })
            
            return result
        
        structure = scan_directory(self.csv_dir)
        
        return {
            "default": structure
        }
    
    def count_prompts_in_csv(self, csv_path):
        try:
            with open(csv_path, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                header = next(reader, None)
                if header:
                    return sum(1 for _ in reader)
        except:
            pass
        return 0
    
    def get_prompts_in_folder(self, folder_path):
        prompts = []
        
        actual_path = os.path.join(self.csv_dir, folder_path)
        
        if os.path.isfile(actual_path) and actual_path.endswith('.csv'):
            prompts = self.read_csv_file(actual_path, folder_path)
        elif os.path.isdir(actual_path):
            prompts = self._read_all_csv_in_dir(actual_path, folder_path)
        
        return prompts
    
    def _read_all_csv_in_dir(self, dir_path, relative_base=""):
        prompts = []
        try:
            for item in sorted(os.listdir(dir_path)):
                item_path = os.path.join(dir_path, item)
                item_rel_path = os.path.join(relative_base, item) if relative_base else item
                if os.path.isfile(item_path) and item.endswith('.csv'):
                    prompts.extend(self.read_csv_file(item_path, item_rel_path))
                elif os.path.isdir(item_path):
                    prompts.extend(self._read_all_csv_in_dir(item_path, item_rel_path))
        except Exception as e:
            print(f"Error reading directory {dir_path}: {e}")
        return prompts
    
    def read_csv_file(self, csv_path, relative_path=""):
        prompts = []
        try:
            with open(csv_path, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    prompts.append({
                        # 读取时解密
                        "title": self.decrypt_text(row.get('title', '')),
                        "content": self.decrypt_text(row.get('content', '')),
                        "source": relative_path
                    })
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"Error reading CSV {csv_path}: {e}")
        
        return prompts
    
    def write_csv_file(self, csv_path, prompts):
        try:
            os.makedirs(os.path.dirname(csv_path), exist_ok=True)
            with open(csv_path, 'w', encoding='utf-8', newline='') as f:
                fieldnames = ['title', 'content']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                for prompt in prompts:
                    writer.writerow({
                        # 写入时加密
                        'title': self.encrypt_text(prompt.get('title', '')),
                        'content': self.encrypt_text(prompt.get('content', ''))
                    })
            return True
        except Exception as e:
            print(f"Error writing CSV {csv_path}: {e}")
            return False
    
    def add_folder(self, parent_path, folder_name):
        try:
            if parent_path:
                base_path = os.path.join(self.csv_dir, parent_path)
            else:
                base_path = self.csv_dir
            
            new_folder_path = os.path.join(base_path, folder_name)
            os.makedirs(new_folder_path, exist_ok=True)
            
            relative_path = os.path.join(parent_path, folder_name) if parent_path else folder_name
            return {"success": True, "path": relative_path}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def delete_folder(self, folder_path):
        try:
            actual_path = os.path.join(self.csv_dir, folder_path)
            
            if os.path.exists(actual_path):
                shutil.rmtree(actual_path)
            
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def delete_csv_file(self, csv_path):
        try:
            actual_path = os.path.join(self.csv_dir, csv_path)
            
            if not os.path.exists(actual_path):
                return {"success": False, "error": "文件不存在"}
            
            if not os.path.isfile(actual_path):
                return {"success": False, "error": "不是有效的CSV文件"}
            
            os.remove(actual_path)
            
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def rename_csv_file(self, csv_path, new_name):
        try:
            if not csv_path:
                return {"success": False, "error": "CSV path is required"}
            if not new_name:
                return {"success": False, "error": "New name is required"}

            if not new_name.endswith('.csv'):
                new_name = new_name + '.csv'

            actual_path = os.path.join(self.csv_dir, csv_path)

            if not os.path.exists(actual_path):
                return {"success": False, "error": "CSV file not found"}
            if not os.path.isfile(actual_path):
                return {"success": False, "error": "Invalid CSV file path"}

            parent_path = os.path.dirname(actual_path)
            new_path = os.path.join(parent_path, new_name)

            if os.path.exists(new_path):
                return {"success": False, "error": "A file with this name already exists"}

            os.rename(actual_path, new_path)

            rel_parent = os.path.dirname(csv_path)
            new_rel_path = os.path.join(rel_parent, new_name) if rel_parent else new_name
            return {"success": True, "path": new_rel_path}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def rename_folder(self, folder_path, new_name):
        try:
            actual_path = os.path.join(self.csv_dir, folder_path)
            
            if not os.path.exists(actual_path):
                return {"success": False, "error": "Folder not found"}
            
            parent_path = os.path.dirname(actual_path)
            new_path = os.path.join(parent_path, new_name)
            
            if os.path.exists(new_path):
                return {"success": False, "error": "A folder with this name already exists"}
            
            os.rename(actual_path, new_path)
            
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def update_prompt(self, folder, old_title, new_title, new_content):
        try:
            actual_path = os.path.join(self.csv_dir, folder)
            
            csv_path = None
            if os.path.isfile(actual_path) and actual_path.endswith('.csv'):
                csv_path = actual_path
            elif os.path.isdir(actual_path):
                for item in os.listdir(actual_path):
                    if item.endswith('.csv'):
                        csv_path = os.path.join(actual_path, item)
                        break
            
            if not csv_path or not os.path.exists(csv_path):
                return {"success": False, "error": "CSV file not found"}
            
            prompts = self.read_csv_file(csv_path)
            
            found = False
            for prompt in prompts:
                if prompt['title'] == old_title:
                    prompt['title'] = new_title
                    prompt['content'] = new_content
                    found = True
                    break
            
            if not found:
                return {"success": False, "error": "Prompt not found"}
            
            if self.write_csv_file(csv_path, prompts):
                return {"success": True}
            else:
                return {"success": False, "error": "Failed to write CSV file"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def delete_prompt(self, folder, title):
        try:
            actual_path = os.path.join(self.csv_dir, folder)

            if not os.path.isfile(actual_path) or not actual_path.endswith('.csv'):
                return {"success": False, "error": "Invalid CSV file path"}

            prompts = self.read_csv_file(actual_path)
            new_prompts = [p for p in prompts if p.get('title', '') != title]

            if len(new_prompts) == len(prompts):
                return {"success": False, "error": "Prompt not found"}

            if self.write_csv_file(actual_path, new_prompts):
                return {"success": True}
            return {"success": False, "error": "Failed to write CSV file"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def reorder_prompts(self, folder, prompts):
        try:
            actual_path = os.path.join(self.csv_dir, folder)

            if not os.path.isfile(actual_path) or not actual_path.endswith('.csv'):
                return {"success": False, "error": "Invalid CSV file path"}

            if not isinstance(prompts, list):
                return {"success": False, "error": "Invalid prompts data"}

            clean_prompts = []
            for p in prompts:
                if not isinstance(p, dict):
                    continue
                clean_prompts.append({
                    "title": p.get("title", ""),
                    "content": p.get("content", "")
                })

            if self.write_csv_file(actual_path, clean_prompts):
                return {"success": True}
            return {"success": False, "error": "Failed to write CSV file"}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def create_csv_file(self, folder_path, file_name):
        try:
            if not file_name.endswith('.csv'):
                file_name = file_name + '.csv'
            
            actual_path = os.path.join(self.csv_dir, folder_path)
            
            if not os.path.isdir(actual_path):
                return {"success": False, "error": "请选择文件夹"}
            
            csv_path = os.path.join(actual_path, file_name)
            
            if os.path.exists(csv_path):
                return {"success": False, "error": "文件已存在"}
            
            self.write_csv_file(csv_path, [])
            
            relative_path = os.path.join(folder_path, file_name) if folder_path else file_name
            return {"success": True, "path": relative_path}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def add_prompt(self, folder, title, content):
        try:
            actual_path = os.path.join(self.csv_dir, folder)
            
            if not os.path.isfile(actual_path) or not actual_path.endswith('.csv'):
                return {"success": False, "error": "Invalid CSV file path"}
            
            csv_path = actual_path
            prompts = self.read_csv_file(csv_path)
            
            for prompt in prompts:
                if prompt['title'] == title:
                    return {"success": False, "error": "Prompt already exists"}
            
            prompts.append({
                "title": title,
                "content": content
            })
            
            if self.write_csv_file(csv_path, prompts):
                return {"success": True}
            else:
                return {"success": False, "error": "Failed to write CSV file"}
        except Exception as e:
            return {"success": False, "error": str(e)}
        
        