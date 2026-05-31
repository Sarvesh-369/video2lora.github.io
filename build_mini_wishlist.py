import json
import os

target_videos = {
    "v_00016582_0.mp4",
    "v_00003192_0.mp4",
    "97732532ef49f985_422_454.mp4",
    "b5bdb7f254cb1727_369_400.mp4",
    "132065802449.mp4",
    "Tarsier_20.mp4"
}

wishlist_path = "/Users/sarvesh/Documents/vid2lora/videos_download/missing_video_import_wishlist.json"
with open(wishlist_path) as f:
    data = json.load(f)

mini_groups = []
found_count = 0

for group in data.get("groups", []):
    dataset = group.get("dataset")
    matching_examples = []
    for ex in group.get("examples", []):
        source_video = ex.get("source_video", "")
        basename = os.path.basename(source_video)
        if basename in target_videos:
            matching_examples.append(ex)
            found_count += 1
            print(f"Found {basename} in dataset {dataset}")
            
    if matching_examples:
        mini_groups.append({
            "dataset": dataset,
            "examples": matching_examples
        })

mini_wishlist = {"groups": mini_groups}
output_path = "/Users/sarvesh/Documents/vid2lora/videos_download/mini_wishlist.json"
with open(output_path, "w") as f:
    json.dump(mini_wishlist, f, indent=2)

print(f"Saved {found_count} videos to {output_path}")
