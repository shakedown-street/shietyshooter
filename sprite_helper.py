import json


def generate_frame_list(start_x, start_y, w, h, xOff, yOff, directions, frames):
    frames_list = []
    for y in range(directions):
        for x in range(frames):
            frame = [
                x,
                y,
                start_x + (w * x),
                start_y + (h * y) + (1 * y),
                w,
                h,
                xOff,
                yOff,
            ]
            frames_list.append(frame)
    return frames_list


def frame_list_to_str(frames_list):
    frames_str = []
    for f in frames_list:
        frames_str.append("\t\t\t\t{},\n".format(f))
    return str(frames_str)


# heavy_armor_item = {
#     "drop": {
#         "duration": 90,
#         "frames": generate_frame_list(0, 7, 96, 160, 48, 144, 1, 15)
#     }
# }

# write_to = open('dump_heavy_armor_item.json', 'w')
# write_to.writelines(json.dumps(heavy_armor_item))
# write_to.close()
