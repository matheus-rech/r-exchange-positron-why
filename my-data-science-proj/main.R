library(tidyverse)

livestock <- read_csv("livestock-numbers-clean-1971-2019.csv")

livestock |>
  filter(geography_type == "New Zealand", !is.na(count)) |>
  ggplot(aes(x = year, y = count, color = animal)) +  
  geom_line() +
  labs(
    title = "New Zealand Livestock Numbers (1971–2019)",
    x = "Year",
    y = "Count",
    color = "Animal"
  )
