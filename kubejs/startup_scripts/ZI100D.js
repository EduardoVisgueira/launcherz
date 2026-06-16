console.info("Startup scripts loaded")

ItemEvents.modification(event => {
  // const silver_12 = ["spartanweaponry:silver_throwing_knife", "spartanweaponry:silver_tomahawk", "spartanweaponry:silver_javelin", "spartanweaponry:silver_boomerang"]
  // silver_12.forEach(item => {
  //   event.modify(item, w => {
  //     w.setMaxDamage(48)
  //     console.info(`Modify ${item} max damage to ${item.maxDamage}`)
  //   })
  // })

  // const silver_48 = ["spartanweaponry:silver_saber", "spartanweaponry:silver_warhammer", "spartanweaponry:silver_lance", "spartanweaponry:silver_flanged_mace", "spartanweaponry:silver_scythe", "spartanweaponry:silver_longsword", "spartanweaponry:silver_rapier", "spartanweaponry:silver_greatsword", "spartanweaponry:silver_battle_hammer", "spartanweaponry:silver_halberd", "spartanweaponry:silver_battleaxe", "spartanweaponry:silver_dagger", "spartanweaponry:silver_spear", "spartanweaponry:silver_pike", "spartanweaponry:silver_parrying_dagger", "spartanweaponry:silver_katana", "spartanweaponry:silver_glaive", "spartanweaponry:silver_quarterstaff", "spartanweaponry:silver_heavy_crossbow"]
  // silver_48.forEach(item => {
  //   event.modify(item, w => {
  //     w.setMaxDamage(210)
  //     console.info(`Modify ${item} max damage to ${w.maxDamage}`)
  //   })
  // })

  // const silver_96 = ["spartanweaponry:silver_longbow"]
  // silver_96.forEach(item => {
  //   event.modify(item, w => {
  //     w.setMaxDamage(360)
  //     console.info(`Modify ${item} max damage to ${w.maxDamage}`)
  //   })
  // })

  const armors = ["minecraft:leather_helmet", "minecraft:leather_chestplate", "minecraft:leather_leggings", "minecraft:leather_boots", "minecraft:chainmail_helmet", "minecraft:chainmail_chestplate", "minecraft:chainmail_leggings", "minecraft:chainmail_boots", "minecraft:iron_helmet", "minecraft:iron_chestplate", "minecraft:iron_leggings", "minecraft:iron_boots", "minecraft:golden_helmet", "minecraft:golden_chestplate", "minecraft:golden_leggings", "minecraft:golden_boots", "minecraft:diamond_helmet", "minecraft:diamond_chestplate", "minecraft:diamond_leggings", "minecraft:diamond_boots", "minecraft:netherite_helmet", "minecraft:netherite_chestplate", "minecraft:netherite_leggings", "minecraft:netherite_boots"]
  const value = [1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,0,1,4,4,1,3,8,6,3]
  armors.forEach((item, i) => {
    event.modify(item, w => {
      let a = w.getAttributes("minecraft:generic.armor")[0].amount
      if (value[i] != 0) w.armorProtection = a + value[i]
      console.info(`Change ${item} armor from ${a} to ${a + value[i]}`)
    })
  })
})
