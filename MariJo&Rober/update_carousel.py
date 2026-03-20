
import os

file_path = '/Users/danielsaborio/Library/CloudStorage/GoogleDrive-d.saboriou@gmail.com/Mi unidad/Trabajo/Antigravity/MariJo&Rober/index.html'

with open(file_path, 'r') as f:
    content = f.read()

# Define the new content for the film-strip
new_film_strip_content = """                <div class="film-strip">
                    <!-- Generative Set 1 -->
                    <div class="film-frame"><img src="assets/galeria/Foto1.jpg" alt="Foto 1"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto2.jpg" alt="Foto 2"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto3.jpg" alt="Foto 3"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto4.jpg" alt="Foto 4"></div>
                    <!-- Generative Set 2 -->
                    <div class="film-frame"><img src="assets/galeria/Foto1.jpg" alt="Foto 1"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto2.jpg" alt="Foto 2"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto3.jpg" alt="Foto 3"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto4.jpg" alt="Foto 4"></div>
                    <!-- Generative Set 3 -->
                    <div class="film-frame"><img src="assets/galeria/Foto1.jpg" alt="Foto 1"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto2.jpg" alt="Foto 2"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto3.jpg" alt="Foto 3"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto4.jpg" alt="Foto 4"></div>
                    <!-- Generative Set 4 -->
                    <div class="film-frame"><img src="assets/galeria/Foto1.jpg" alt="Foto 1"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto2.jpg" alt="Foto 2"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto3.jpg" alt="Foto 3"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto4.jpg" alt="Foto 4"></div>
                    <!-- Generative Set 5 -->
                    <div class="film-frame"><img src="assets/galeria/Foto1.jpg" alt="Foto 1"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto2.jpg" alt="Foto 2"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto3.jpg" alt="Foto 3"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto4.jpg" alt="Foto 4"></div>
                    <!-- Generative Set 6 -->
                    <div class="film-frame"><img src="assets/galeria/Foto1.jpg" alt="Foto 1"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto2.jpg" alt="Foto 2"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto3.jpg" alt="Foto 3"></div>
                    <div class="film-frame"><img src="assets/galeria/Foto4.jpg" alt="Foto 4"></div>
                </div>"""

# Find the start and end of the film-strip div
start_marker = '<div class="film-strip">'
end_marker = '</div>' # This is too generic, need to match the closing div of film-strip

# We know the structure:
# <div class="film-strip">
#    ... content ...
# </div>
#             </div> <!-- film-roll-container closing -->

# Let's find the start index
start_idx = content.find(start_marker)
if start_idx == -1:
    print("Could not find start marker")
    exit(1)

# Find the closing div. Since there are nested divs (film-frame), we need to be careful.
# But actually, the film-strip div contains many film-frame divs.
# I can find the index of `            </div>\n        </section>` which terminates the container?
# No, `box-container` closes, then section closes.
# Let's rely on indentations if possible, or just replace the known old content block if I can get it right? 
# No, easier: logic to find matching closing div is complex with regex/string find.
# But I know the content ends with:
#                     <div class="film-frame">
#                         <img src="assets/galeria/Foto4.jpg" alt="Foto 4">
#                     </div>
#                 </div>

end_sequence = 'alt="Foto 4">\n                    </div>\n                </div>'
# The spacing might be different.

# Alternative: Use regex to replace everything inside film-strip div?
# Or just replace the whole section since I know what it looks like.
# I'll replace the whole `film-roll-container` block.

full_block_start = '<div class="film-roll-container">'
full_block_end = '</section>'

start_pos = content.find(full_block_start)
end_pos = content.find(full_block_end, start_pos)

if start_pos != -1 and end_pos != -1:
    # Construct the new block
    # We need to keep the closing </section>
    # The new content should coincide with the formatting.
    
    new_block = """<div class="film-roll-container">
""" + new_film_strip_content + """
            </div>"""
    
    # We replace from start_pos to end_pos (exclusive of </section>)
    # But wait, end_pos points to < of </section>.
    # So content[start_pos:end_pos] is the container and some newlines.
    
    # Let's verify what we are replacing.
    old_content = content[start_pos:end_pos]
    # print(old_content)
    
    # We want to preserve the indentation of the closing div?
    # My new_block has `            </div>` at the end.
    
    # Let's format `new_block` to have correct indentation relative to the file.
    # It seems the file uses 12 spaces for `film-roll-container`. 
    # `            <div class="film-roll-container">` (12 spaces).
    
    # My `new_film_strip_content` has 16 spaces for `<div class="film-strip">`.
    
    # Let's just do the replacement.
    updated_content = content[:start_pos] + new_block + "\n        " + content[end_pos:] 
    # Added newline and 8 spaces indent for the closing </section> tag which is at `end_pos`?
    # No `end_pos` is at `</section>`.
    # content[end_pos] is `<`.
    # The line before `</section>` usually has indentation.
    
    with open(file_path, 'w') as f:
        f.write(updated_content)
    print("Successfully updated index.html")
else:
    print("Could not identify the block to replace.")
