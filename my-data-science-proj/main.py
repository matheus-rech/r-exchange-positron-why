import pandas as pd
import matplotlib.pyplot as plt

livestock = pd.read_csv("livestock-numbers-clean-1971-2019.csv")

filtered = livestock[
    (livestock["geography_type"] == "New Zealand") & (livestock["count"].notna())
]

fig, ax = plt.subplots()
for animal, group in filtered.groupby("animal"):
    ax.plot(group["year"], group["count"], label=animal)

ax.set_title("New Zealand Livestock Numbers (1971–2019)")
ax.set_xlabel("Year")
ax.set_ylabel("Count")
ax.legend(title="Animal")
plt.show()